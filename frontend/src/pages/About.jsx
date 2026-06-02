import { IMAGES } from '../data/restaurant'
import './About.css'

export default function About() {
  return (
    <>
      <section className="page-hero page-hero--tall">
        <img src={IMAGES.event} alt="About Café Fausse" />
        <div className="page-hero-content">
          <p className="eyebrow">Our Story</p>
          <h1>About Us</h1>
          <p className="hero-lead">Quality, creativity, and an unforgettable dining experience.</p>
        </div>
      </section>

      <section className="section about-page">
        <div className="container about-grid">
          <article className="card-luxury about-story">
            <p className="eyebrow">Since 2010</p>
            <h2 className="section-title">About Café Fausse</h2>
            <p>
              Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends
              traditional Italian flavors with modern culinary innovation. Our mission is to provide an
              unforgettable dining experience that reflects both quality and creativity.
            </p>
            <p>
              Every dish is crafted with attention to detail, from house-made pastas to carefully sourced
              proteins and produce. We believe fine dining should feel warm, welcoming, and distinctly memorable.
            </p>
          </article>

          <article className="card-luxury founder-card">
            <h3>Chef Antonio Rossi</h3>
            <p>
              Trained in Rome and Florence, Chef Rossi brings classical Italian technique to every plate.
              His menus celebrate seasonal ingredients while honoring the traditions that shaped his culinary journey.
            </p>
          </article>

          <article className="card-luxury founder-card">
            <h3>Maria Lopez</h3>
            <p>
              Maria Lopez shaped Café Fausse into a destination for hospitality and elegance. Her vision
              ensures that every guest enjoys impeccable service alongside exceptional food and wine.
            </p>
          </article>

          <article className="card-luxury about-commitment">
            <p className="eyebrow">Our Promise</p>
            <h2 className="section-title">Our Commitment</h2>
            <ul>
              <li>Unforgettable dining experiences with attentive service</li>
              <li>Excellent food prepared with precision and artistry</li>
              <li>Locally sourced ingredients whenever possible</li>
              <li>A welcoming atmosphere for celebrations and intimate evenings alike</li>
            </ul>
          </article>
        </div>
      </section>
    </>
  )
}
