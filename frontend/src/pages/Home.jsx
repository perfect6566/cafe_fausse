import { Link } from 'react-router-dom'
import { AWARDS, IMAGES, RESTAURANT, REVIEWS } from '../data/restaurant'
import NewsletterForm from '../components/NewsletterForm'
import './Home.css'

export default function Home() {
  return (
    <>
      <section className="hero">
        <img src={IMAGES.home} alt="Café Fausse fine dining room" />
        <div className="hero-overlay">
          <div className="container hero-content">
            <p className="eyebrow">Est. 2010 · Washington, DC</p>
            <h1>
              <span className="hero-title-main">{RESTAURANT.name}</span>
            </h1>
            <p className="hero-tagline">
              Where traditional Italian artistry meets contemporary fine dining —
              an evening crafted to linger in memory.
            </p>
            <div className="hero-divider" aria-hidden="true" />
            <div className="hero-actions">
              <Link to="/reservations" className="btn btn-gold">
                Reserve a Table
              </Link>
              <Link to="/menu" className="btn btn-outline">
                Explore Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-intro">
        <div className="container intro-grid">
          <div className="intro-image-wrap">
            <img src={IMAGES.interior} alt="Elegant dining room at Café Fausse" />
            <div className="intro-image-frame" aria-hidden="true" />
          </div>
          <div className="intro-copy">
            <p className="eyebrow">The Experience</p>
            <h2 className="section-title">A Sanctuary of Taste &amp; Elegance</h2>
            <p>
              Every detail — from the candlelit tables to the final pour of wine — is designed
              to elevate your evening. Café Fausse invites you into a world where hospitality
              is an art form.
            </p>
            <Link to="/about" className="text-link">Discover Our Story →</Link>
          </div>
        </div>
      </section>

      <section className="section home-details">
        <div className="container details-grid">
          <div className="detail-card card-luxury">
            <p className="eyebrow">Visit Us</p>
            <h3>Location &amp; Hours</h3>
            <p>{RESTAURANT.address}</p>
            <p>{RESTAURANT.phone}</p>
            <div className="detail-divider" />
            <p>{RESTAURANT.hours.weekday}</p>
            <p>{RESTAURANT.hours.sunday}</p>
          </div>
          <div className="detail-card card-luxury">
            <p className="eyebrow">Recognition</p>
            <h3>Awards &amp; Accolades</h3>
            <ul className="award-list">
              {AWARDS.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <p className="eyebrow eyebrow--center">Testimonials</p>
          <h2 className="section-title section-title--center">Voices of Our Guests</h2>
          <div className="reviews-grid">
            {REVIEWS.map((review) => (
              <blockquote key={review.source} className="review-card card-luxury">
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <p>{review.quote}</p>
                <cite>&mdash; {review.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-inner card-luxury">
          <div>
            <p className="eyebrow">Stay Inspired</p>
            <h2 className="section-title">Join Our Newsletter</h2>
            <p className="section-subtitle">
              Receive exclusive invitations, seasonal menus, and behind-the-scenes stories
              from our kitchen.
            </p>
          </div>
          <div className="cta-newsletter-form">
            <NewsletterForm idPrefix="home-newsletter" />
          </div>
        </div>
      </section>
    </>
  )
}
