from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Customer(db.Model):
    __tablename__ = 'customers'

    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(255), nullable=False)
    email_address = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(50), nullable=True)
    newsletter_signup = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    reservations = db.relationship('Reservation', backref='customer', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'customer_id': self.customer_id,
            'customer_name': self.customer_name,
            'email_address': self.email_address,
            'phone_number': self.phone_number,
            'newsletter_signup': self.newsletter_signup,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


class Reservation(db.Model):
    __tablename__ = 'reservations'

    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id', ondelete='CASCADE'), nullable=False)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    num_guests = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

    __table_args__ = (
        db.CheckConstraint('table_number >= 1 AND table_number <= 30', name='check_table_number'),
        db.CheckConstraint('num_guests > 0', name='check_num_guests'),
        db.UniqueConstraint('time_slot', 'table_number', name='unique_time_slot_table'),
        db.Index('idx_reservations_time_slot', 'time_slot'),
    )

    def to_dict(self):
        return {
            'reservation_id': self.reservation_id,
            'customer_id': self.customer_id,
            'time_slot': self.time_slot.isoformat() if self.time_slot else None,
            'table_number': self.table_number,
            'num_guests': self.num_guests,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
