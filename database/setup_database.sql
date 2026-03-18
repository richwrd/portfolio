-- Setup Script for Portfolio Application Database User (PostgreSQL 18.x)
-- Run this as superuser (postgres) before deploying the schema.

-- 1. Create a secure user for the application
-- Replace 'suasenhasegura' with a strong password.
CREATE USER portfolio_app WITH PASSWORD 'suasenhasegura';

-- 2. Create the application database
CREATE DATABASE portfolio OWNER portfolio_app;

-- 3. Connect to the new database (if running via psql)
-- \c portfolio

-- 4. Grant limited permissions for security (Best Practice)
-- The application only needs to INSERT, SELECT, and optionally UPDATE (if logs are refined later)
REVOKE ALL ON DATABASE portfolio FROM PUBLIC;
GRANT CONNECT ON DATABASE portfolio TO portfolio_app;

-- Note: After running this, the 'portfolio_app' user will have full ownership of its database.
-- However, for even tighter security, you could create the schema as superuser 
-- and then grant specific INSERT/SELECT rights to 'portfolio_app'.
