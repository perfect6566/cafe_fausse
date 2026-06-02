import { useState } from 'react'
import DateTimePicker from '../components/DateTimePicker'
import './Reservations.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm = {
  time_slot: '',
  num_guests: '2',
  customer_name: '',
  email: '',
  phone_number: '',
}

export default function Reservations() {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [availability, setAvailability] = useState(null)

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function checkAvailability(timeSlot) {
    if (!timeSlot) {
      setAvailability(null)
      return
    }

    try {
      const response = await fetch(`/api/reservations/availability?time_slot=${encodeURIComponent(timeSlot)}`)
      const data = await response.json()
      if (data.success) {
        setAvailability(data)
      }
    } catch {
      setAvailability(null)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!form.customer_name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    if (!form.time_slot) {
      setError('Please select a time slot.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          time_slot: form.time_slot,
          num_guests: Number(form.num_guests),
        }),
      })
      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || 'Reservation failed. Please try another time.')
        return
      }

      setMessage(data.message)
      setForm(initialForm)
      setAvailability(null)
    } catch {
      setError('Unable to connect to the server. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="page-hero page-hero--tall reservations-hero">
        <img src="/images/gallery-cafe-interior.webp" alt="Reserve a table at Café Fausse" />
        <div className="page-hero-content">
          <p className="eyebrow">Book Your Evening</p>
          <h1>Reservations</h1>
          <p className="hero-lead">Book your table online and let us prepare an exceptional evening.</p>
        </div>
      </section>

      <section className="section reservations-page">
        <div className="container reservation-layout">
          <div className="reservation-info card-luxury">
            <h2 className="section-title">Dining Details</h2>
            <p>We accept reservations in 30-minute intervals during business hours.</p>
            <p>Each reservation is assigned one of our 30 tables automatically when available.</p>
            <p>If your preferred time is fully booked, please select another slot.</p>
          </div>

          <form className="reservation-form card-luxury" onSubmit={handleSubmit} noValidate>
            <h2 className="section-title">Book a Table</h2>
            <div className="form-grid">
              <div className="form-group form-group--full">
                <label>Date &amp; Time</label>
                <DateTimePicker
                  value={form.time_slot}
                  onChange={(value) => {
                    updateField('time_slot', value)
                    if (value) {
                      checkAvailability(value)
                    } else {
                      setAvailability(null)
                    }
                  }}
                />
              </div>

              {availability && (
                <p className={`availability ${availability.is_available ? 'available' : 'full'}`}>
                  {availability.is_available
                    ? `${availability.available_tables} table(s) available for this time slot.`
                    : 'This time slot is fully booked. Please choose another time.'}
                </p>
              )}

              <div className="form-group">
                <label htmlFor="num_guests">Number of Guests</label>
                <input
                  id="num_guests"
                  type="number"
                  min="1"
                  max="12"
                  value={form.num_guests}
                  onChange={(event) => updateField('num_guests', event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer_name">Customer Name</label>
                <input
                  id="customer_name"
                  type="text"
                  value={form.customer_name}
                  onChange={(event) => updateField('customer_name', event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_number">Phone Number (optional)</label>
                <input
                  id="phone_number"
                  type="tel"
                  value={form.phone_number}
                  onChange={(event) => updateField('phone_number', event.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-gold" disabled={loading}>
              {loading ? 'Booking...' : 'Confirm Reservation'}
            </button>

            {error && <p className="alert error">{error}</p>}
            {message && <p className="alert success">{message}</p>}
          </form>
        </div>
      </section>
    </>
  )
}
