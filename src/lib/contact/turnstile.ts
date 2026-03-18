import axios from 'axios';
import { isDevelopment, turnstile } from './config';

const LOCALHOST_TOKEN = 'localhost-token';

export async function verifyTurnstile(token: string): Promise<void> {
  if (!token) {
    throw new TurnstileError('Captcha token missing', 400);
  }

  const isLocalhostBypass = isDevelopment && token === LOCALHOST_TOKEN;
  if (isLocalhostBypass) return;

  try {
    const { data } = await axios.post(turnstile.verifyUrl, {
      secret: turnstile.secretKey,
      response: token,
    });

    if (!data.success) {
      console.error('Turnstile verification failed:', data);
      throw new TurnstileError('Captcha validation failed', 400);
    }
  } catch (err) {
    if (err instanceof TurnstileError) throw err;

    console.error('Turnstile verification error:', err);

    // In development, let the request through even if Turnstile itself errors
    if (!isDevelopment) {
      throw new TurnstileError('Captcha service error', 400);
    }
  }
}

export class TurnstileError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = 'TurnstileError';
  }
}