-- Create database (run this manually or use init_db.py)
CREATE DATABASE cafe_fausse;
-- Connect to the database: \c cafe_fausse;

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50),
    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id) ON DELETE CASCADE,
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL CHECK (table_number >= 1 AND table_number <= 30),
    num_guests INTEGER NOT NULL CHECK (num_guests > 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (time_slot, table_number)
);

-- Create index for faster time_slot queries
CREATE INDEX IF NOT EXISTS idx_reservations_time_slot ON reservations(time_slot);
