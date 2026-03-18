export const isDevelopment = process.env.NODE_ENV === 'development';

export const turnstile = {
  secretKey: process.env.TURNSTILE_SECRET_KEY,
  verifyUrl: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
};

export const zepto = {
  url: process.env.ZEPTOMAIL_URL,
  token: process.env.ZEPTOMAIL_TOKEN,
  from: {
    address: process.env.ZEPTOMAIL_FROM_ADDRESS ?? 'noreply@eduardorichard.com',
    name: process.env.ZEPTOMAIL_FROM_NAME ?? 'Portfolio',
  },
  to: {
    address: process.env.ZEPTOMAIL_TO_ADDRESS ?? 'founder@eduardorichard.com',
    name: process.env.ZEPTOMAIL_TO_NAME ?? 'Eduardo Richard',
  },
  simulateSuccess: process.env.ZEPTOMAIL_SIMULATE_SUCCESS === 'true',
};