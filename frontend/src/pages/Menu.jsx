import { MENU, formatPrice } from '../data/restaurant'
import './Menu.css'

const categories = [
  { key: 'starters', title: 'Starters', subtitle: 'Begin your journey' },
  { key: 'mainCourses', title: 'Main Courses', subtitle: 'The heart of our kitchen' },
  { key: 'desserts', title: 'Desserts', subtitle: 'A sweet finale' },
  { key: 'beverages', title: 'Beverages', subtitle: 'Curated pairings' },
]

export default function Menu() {
  return (
    <>
      <section className="page-hero page-hero--tall">
        <img src="/images/gallery-ribeye-steak.webp" alt="Menu highlights at Café Fausse" />
        <div className="page-hero-content">
          <p className="eyebrow">Culinary Collection</p>
          <h1>Our Menu</h1>
          <p className="hero-lead">
            Seasonal ingredients, classical technique, and artful presentation —
            each dish a testament to our craft.
          </p>
        </div>
      </section>

      <section className="section menu-page">
        <div className="container menu-sections">
          {categories.map((category) => (
            <article key={category.key} className="menu-category">
              <header className="menu-category-header">
                <p className="eyebrow">{category.subtitle}</p>
                <h2>{category.title}</h2>
                <div className="category-line" aria-hidden="true" />
              </header>
              <ul className="menu-list">
                {MENU[category.key].map((item) => (
                  <li key={item.name} className="menu-item card-luxury">
                    <div className="menu-item-image">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ objectPosition: item.imagePosition }}
                        loading="lazy"
                      />
                      <div className="menu-item-image-overlay" aria-hidden="true" />
                    </div>
                    <div className="menu-item-body">
                      <div className="menu-item-header">
                        <h3>{item.name}</h3>
                        <span className="menu-price">{formatPrice(item.price)}</span>
                      </div>
                      <div className="menu-item-divider" aria-hidden="true" />
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
