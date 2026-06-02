import { useEffect, useState, useCallback } from 'react'
import { AWARDS, GALLERY_IMAGES, REVIEWS } from '../data/restaurant'
import './Gallery.css'

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
  }, [])

  const goToPrevious = useCallback((e) => {
    e?.stopPropagation()
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    )
  }, [])

  const goToNext = useCallback((e) => {
    e?.stopPropagation()
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % GALLERY_IMAGES.length
    )
  }, [])

  useEffect(() => {
    function handleKeyDown(event) {
      if (activeIndex === null) return
      if (event.key === 'Escape') {
        closeLightbox()
      } else if (event.key === 'ArrowLeft') {
        goToPrevious()
      } else if (event.key === 'ArrowRight') {
        goToNext()
      }
    }

    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, closeLightbox, goToPrevious, goToNext])

  return (
    <>
      <section className="page-hero page-hero--tall">
        <img src="/images/gallery-cafe-interior.webp" alt="Café Fausse gallery" />
        <div className="page-hero-content">
          <p className="eyebrow">Visual Journey</p>
          <h1>Gallery</h1>
          <p className="hero-lead">Explore our ambiance, cuisine, and celebrated moments.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {GALLERY_IMAGES.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className="gallery-item"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${image.caption}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span>{image.caption}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section gallery-highlights">
        <div className="container highlights-grid">
          <div className="card card-luxury">
            <h2 className="section-title">Awards</h2>
            <ul>
              {AWARDS.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>
          <div className="card card-luxury">
            <h2 className="section-title">Customer Reviews</h2>
            {REVIEWS.map((review) => (
              <blockquote key={review.source} className="gallery-review">
                <p>&ldquo;{review.quote}&rdquo;</p>
                <cite>&mdash; {review.source}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {activeIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY_IMAGES[activeIndex].caption}
          onClick={closeLightbox}
        >
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              &times;
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              type="button"
              className="lightbox-nav lightbox-nav--next"
              onClick={goToNext}
              aria-label="Next image"
            >
              &#8250;
            </button>
            <img src={GALLERY_IMAGES[activeIndex].src} alt={GALLERY_IMAGES[activeIndex].alt} />
            <p>{GALLERY_IMAGES[activeIndex].caption}</p>
            <div className="lightbox-counter">
              {activeIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
