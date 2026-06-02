"""Initialize PostgreSQL database and tables for Café Fausse using SQLAlchemy."""

import os
import sys

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/cafe_fausse",
)


def create_database_if_needed(database_url):
    """Create the database if it doesn't exist using psycopg2."""
    import psycopg2

    if not database_url.startswith("postgresql://"):
        raise ValueError("DATABASE_URL must use postgresql:// scheme")

    without_scheme = database_url[len("postgresql://"):]
    credentials, host_part = without_scheme.split("@", 1)
    user, password = credentials.split(":", 1)
    host_port, dbname = host_part.rsplit("/", 1)

    if ":" in host_port:
        host, port = host_port.split(":", 1)
    else:
        host, port = host_port, "5432"

    admin_config = {
        "user": user,
        "password": password,
        "host": host,
        "port": port,
        "dbname": "postgres",
    }

    print(f"Connecting to PostgreSQL at {host}:{port}...")
    with psycopg2.connect(**admin_config) as conn:
        conn.autocommit = True
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (dbname,))
            exists = cur.fetchone()
            if not exists:
                cur.execute(f'CREATE DATABASE "{dbname}"')
                print(f"Created database: {dbname}")
            else:
                print(f"Database already exists: {dbname}")


def create_tables():
    """Create all tables using SQLAlchemy."""
    from flask import Flask
    from flask_sqlalchemy import SQLAlchemy

    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db = SQLAlchemy()
    db.init_app(app)

    # Define models inline to avoid circular imports
    class Customer(db.Model):
        __tablename__ = 'customers'

        customer_id = db.Column(db.Integer, primary_key=True)
        customer_name = db.Column(db.String(255), nullable=False)
        email_address = db.Column(db.String(255), nullable=False, unique=True)
        phone_number = db.Column(db.String(50), nullable=True)
        newsletter_signup = db.Column(db.Boolean, nullable=False, default=False)
        created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.current_timestamp())

        reservations = db.relationship('Reservation', backref='customer', lazy=True, cascade='all, delete-orphan')

    class Reservation(db.Model):
        __tablename__ = 'reservations'

        reservation_id = db.Column(db.Integer, primary_key=True)
        customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete='CASCADE'), nullable=False)
        time_slot = db.Column(db.DateTime, nullable=False)
        table_number = db.Column(db.Integer, nullable=False)
        num_guests = db.Column(db.Integer, nullable=False)
        created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.current_timestamp())

        __table_args__ = (
            db.CheckConstraint('table_number >= 1 AND table_number <= 30', name='check_table_number'),
            db.CheckConstraint('num_guests > 0', name='check_num_guests'),
            db.UniqueConstraint('time_slot', 'table_number', name='unique_time_slot_table'),
            db.Index('idx_reservations_time_slot', 'time_slot'),
        )

    with app.app_context():
        db.create_all()
        print("Tables created successfully!")
        
        # List all tables
        from sqlalchemy import text
        result = db.session.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"))
        tables = [row[0] for row in result]
        print(f"Tables in database: {', '.join(tables)}")


def main():
    try:
        create_database_if_needed(DATABASE_URL)
        create_tables()
        print("\nDatabase initialization completed successfully!")
    except Exception as exc:
        print(f"Database initialization failed: {exc}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
