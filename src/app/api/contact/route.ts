import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { isDevelopment } from '@/lib/contact/config';
import { verifyTurnstile, TurnstileError } from '@/lib/contact/turnstile';
import { sendContactEmail, hasZeptoCredentials, ContactPayload } from '@/lib/contact/mailer';
import { simulatedSuccessOrNull } from '@/lib/contact/simulation';
import { recordContact, checkRecentActivity } from '@/lib/contact/db';

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = (await request.json()) as ContactPayload & {
      token?: string;
    };

    const headerList = await headers();
    const forwarded = headerList.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (headerList.get('x-real-ip') || 'unknown');
    const userAgent = headerList.get('user-agent') || 'unknown';

    // 0. Database Check (Rate Limit)
    if (process.env.DATABASE_URL) {
      const isRateLimited = await checkRecentActivity(email, ip);
      if (isRateLimited) {
        return NextResponse.json(
          { 
            error: 'Muitas mensagens enviadas. Por favor, tente novamente em 1 hora.',
            code: 'RATE_LIMIT_EXCEEDED'
          },
          { status: 429 }
        );
      }
    }

    // 1. Captcha
    await verifyTurnstile(token ?? '');

    // 2. Record in DB as fallback
    if (process.env.DATABASE_URL) {
      try {
        await recordContact({ 
          name, 
          email, 
          message, 
          ip_address: ip, 
          user_agent: userAgent 
        });
      } catch (dbError) {
        console.error('Failed to log contact to database:', dbError);
        // We continue anyway so we can try to send the email
      }
    }

    // 3. Send e-mail
    if (hasZeptoCredentials()) {
      try {
        await sendContactEmail({ name, email, message });
      } catch (mailError: any) {
        console.error('ZeptoMail Error:', JSON.stringify(mailError, null, 2));

        const simulated = simulatedSuccessOrNull({
          reason: 'ZeptoMail failed',
          devError: mailError?.message ?? mailError?.error?.message,
        });
        if (simulated) return simulated;

        return NextResponse.json(
          {
            error: 'Failed to send email via ZeptoMail',
            details: isDevelopment
              ? (mailError?.message ?? mailError?.error?.message)
              : undefined,
          },
          { status: 500 },
        );
      }
    } else {
      const simulated = simulatedSuccessOrNull({ reason: 'no credentials' });
      if (simulated) return simulated;

      console.log('Email sending skipped (no credentials). Data:', { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    if (error instanceof TurnstileError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }

    console.error('Contact error:', error);
    const err = error as { message?: string };

    return NextResponse.json(
      {
        error: 'Failed to process request. Please try again later.',
        details: isDevelopment ? err.message : undefined,
      },
      { status: 500 },
    );
  }
}