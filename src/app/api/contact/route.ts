import axios from 'axios';
import { NextResponse } from 'next/server';
import { SendMailClient } from "zeptomail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, token } = body;

    const isDevelopment = process.env.NODE_ENV === 'development';
    const isLocalhostToken = token === 'localhost-token';

    if (isDevelopment) {
      console.log('Contact API Request:', {
        name,
        email,
        isLocalhostToken,
        tokenReceived: token ? '(present)' : '(missing)',
        isDev: isDevelopment,
      });
    }

    if (!token) {
      return NextResponse.json({ error: 'Captcha token missing' }, { status: 400 });
    }

    // Skip verification in development if the token is the placeholder 'localhost-token'
    if (!(isDevelopment && isLocalhostToken)) {
      // Verify Turnstile Token
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      try {
        const result = await axios.post(verifyUrl, {
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        });

        if (!result.data.success) {
          console.error('Turnstile verification failed:', result.data);
          return NextResponse.json({ error: 'Captcha validation failed' }, { status: 400 });
        }
      } catch (err: unknown) {
        console.error('Turnstile verification error:', err);
        if (!isDevelopment) {
          return NextResponse.json({ error: 'Captcha service error' }, { status: 400 });
        }
      }
    }

    // Send Email via ZeptoMail
    const zeptoUrl = process.env.ZEPTOMAIL_URL;
    const zeptoToken = process.env.ZEPTOMAIL_TOKEN;
    const fromAddress = process.env.ZEPTOMAIL_FROM_ADDRESS || 'noreply@eduardorichard.com';
    const fromName = process.env.ZEPTOMAIL_FROM_NAME || 'Portfolio';
    const toAddress = process.env.ZEPTOMAIL_TO_ADDRESS || 'founder@eduardorichard.com';
    const toName = process.env.ZEPTOMAIL_TO_NAME || 'Eduardo Richard';

    if (zeptoUrl && zeptoToken) {
      const client = new SendMailClient({
        url: zeptoUrl,
        token: zeptoToken
      });

      try {
        await client.sendMail({
          "from": {
            "address": fromAddress,
            "name": fromName
          },
          "to": [
            {
              "email_address": {
                "address": toAddress,
                "name": toName
              }
            }
          ],
          "subject": `Portfolio Contact: ${name}`,
          "htmlbody": `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });

        if (isDevelopment) {
          console.log('Email sent successfully via ZeptoMail');
        }
      } catch (mailError: any) {
        // Detailed logging for debugging
        console.error('ZeptoMail Error:', JSON.stringify(mailError, null, 2));
        
        const shouldSimulate = process.env.ZEPTOMAIL_SIMULATE_SUCCESS === 'true';

        // Simulation toggle for UI testing
        if (shouldSimulate) {
          console.warn('⚠️ SIMULATION MODE: ZeptoMail failed but returning success to frontend.');
          return NextResponse.json({ 
            success: true, 
            message: 'Simulated success (Simulation Active)',
            devError: mailError.message || mailError.error?.message 
          });
        }

        return NextResponse.json(
          { 
            error: 'Failed to send email via ZeptoMail',
            details: isDevelopment ? (mailError.message || mailError.error?.message) : undefined 
          },
          { status: 500 }
        );
      }
    } else {
      const shouldSimulate = process.env.ZEPTOMAIL_SIMULATE_SUCCESS === 'true';
      if (shouldSimulate) {
        console.log('Skipping real send (missing credentials). Returning simulated success.');
        return NextResponse.json({ success: true, message: 'Simulated success (no credentials)' });
      }
      console.log('Email sending skipped (no credentials). Data:', { name, email, message });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Contact error:', error);
    const err = error as { code?: string; message?: string };

    return NextResponse.json(
      {
        error: 'Failed to process request. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
      },
      { status: 500 }
    );
  }
}
