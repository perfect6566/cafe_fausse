import NewsletterForm from '../components/NewsletterForm'
import { IMAGES } from '../data/restaurant'
import './Newsletter.css'

const perks = [
  'Seasonal menu previews before public release',
  'Invitations to wine dinners and chef\'s table events',
  'Exclusive holiday tasting menus and pairings',
  'Priority notice for special occasion reservations',
]

export default function Newsletter() {
  return (
    <>
      <section className="page-hero page-hero--tall">
        <img src={IMAGES.event} alt="Join the Café Fausse newsletter" />
        <div className="page-hero-content">
          <p className="eyebrow">Stay Connected</p>
          <h1>Newsletter</h1>
          <p className="hero-lead">
            An exclusive invitation to the world of Café Fausse — delivered to your inbox.
          </p>
        </div>
      </section>

      <section className="section newsletter-page">
        <div className="container newsletter-layout">
          <div className="newsletter-intro">
            <p className="eyebrow">Email Newsletter Signup</p>
            <h2 className="section-title">Join Our Inner Circle</h2>
            <p className="section-subtitle">
              Be the first to discover new dishes, private events, and seasonal celebrations
              crafted by Chef Antonio Rossi and our team.
            </p>
            <ul className="newsletter-perks">
              {perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>

          <div className="newsletter-panel card-luxury">
            <div className="newsletter-panel-header">
              <span className="panel-icon" aria-hidden="true">✦</span>
              <h3>Subscribe Today</h3>
              <p>Enter your details below. We respect your privacy and never share your information.</p>
            </div>
            <NewsletterForm idPrefix="page-newsletter" />
          </div>
        </div>
      </section>
    </>
  )
}
