-- Database Schema for Portfolio Contact Form
-- Designed for PostgreSQL 18.x
-- Author: Eduardo Richard (DBA & Software Engineer)

-- 1. Create table for contact messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Performance Indexes
-- Essential for the rate-limiting query (checkRecentActivity)
CREATE INDEX IF NOT EXISTS idx_contact_messages_email_created_at 
ON contact_messages (email, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_messages_ip_created_at 
ON contact_messages (ip_address, created_at DESC);

-- 3. Optimal Maintenance (Optional for High Traffic)
-- Note: As a DBA, you might want to partition this table if sending volume is extremely high over years,
-- but for a portfolio, these indexes are more than sufficient.

COMMENT ON TABLE contact_messages IS 'Logs of messages sent through the contact form with rate-limiting support.';
COMMENT ON COLUMN contact_messages.ip_address IS 'IP address of the sender for security and rate-limiting.';
