import { query } from "../db";

export interface ContactRecord {
  id?: number;
  name: string;
  email: string;
  message: string;
  ip_address: string;
  user_agent?: string;
  created_at?: Date;
}

export async function recordContact(contact: ContactRecord) {
  const sql = `
    INSERT INTO contact_messages (name, email, message, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;
  `;
  const values = [
    contact.name,
    contact.email,
    contact.message,
    contact.ip_address,
    contact.user_agent || null
  ];

  const result = await query(sql, values);
  return result.rows[0].id;
}

export async function checkRecentActivity(email: string, ip: string): Promise<boolean> {
  const sql = `
    SELECT COUNT(*) as count 
    FROM contact_messages 
    WHERE (email = $1 OR ip_address = $2)
    AND created_at > (NOW() - INTERVAL '24 hour');
  `;
  const result = await query(sql, [email, ip]);
  const count = parseInt(result.rows[0].count);
  return count > 0;
}
