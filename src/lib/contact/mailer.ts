import { SendMailClient } from 'zeptomail';
import { isDevelopment, zepto } from './config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function buildHtmlBody({ name, email, message }: ContactPayload): string {
  return `
    <h3>New Contact Message</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `;
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  const client = new SendMailClient({ url: zepto.url!, token: zepto.token! });

  await client.sendMail({
    from: zepto.from,
    to: [{ email_address: zepto.to }],
    subject: `Portfolio Contact: ${payload.name}`,
    htmlbody: buildHtmlBody(payload),
  });

  if (isDevelopment) {
    console.log('Email sent successfully via ZeptoMail');
  }
}

export function hasZeptoCredentials(): boolean {
  return Boolean(zepto.url && zepto.token);
}