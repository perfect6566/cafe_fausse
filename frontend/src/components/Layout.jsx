import { NavLink } from 'react-router-dom'
import { RESTAURANT } from '../data/restaurant'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/newsletter', label: 'Newsletter' },
  { to: '/about', label: 'About Us' },
  { to: '/gallery', label: 'Gallery' },
]

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <NavLink to="/" className="brand">
            <span className="brand-mark" aria-hidden="true">CF</span>
            <span className="brand-text">{RESTAURANT.name}</span>
          </NavLink>
          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <div className="footer-accent" aria-hidden="true" />
        <div className="container footer-grid">
          <div className="footer-brand">
            <h2>{RESTAURANT.name}</h2>
            <p className="footer-tagline">Fine dining redefined since 2010</p>
            <p>{RESTAURANT.address}</p>
            <p>{RESTAURANT.phone}</p>
          </div>
          <div>
            <h3>Hours</h3>
            <p>{RESTAURANT.hours.weekday}</p>
            <p>{RESTAURANT.hours.sunday}</p>
          </div>
          <div>
            <h3>Explore</h3>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navItems.slice(1).map((item) => (
                <NavLink key={item.to} to={item.to}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>&copy; {new Date().getFullYear()} {RESTAURANT.name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
