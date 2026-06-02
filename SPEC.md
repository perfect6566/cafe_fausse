# Café Fausse - Software Requirements Specification

> **Document Version**: 1.0
> **Based on**: MSEE_Web_Application_and_Interface_Design_Cafe_Fausse_SRS.pdf
> **Last Updated**: June 2026
> **Project**: Café Fausse Web Application
> **Course**: MS AI Engineering, George Washington University

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [SRS Requirements Mapping](#2-srs-requirements-mapping)
3. [System Architecture](#3-system-architecture)
4. [Database Schema](#4-database-schema)
5. [Functionality Specification](#5-functionality-specification)
6. [API Specification](#6-api-specification)
7. [UI/UX Design Guidelines](#7-uiux-design-guidelines)
8. [Non-Functional Requirements](#8-non-functional-requirements)

---

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification (SRS) document provides comprehensive requirements for the Café Fausse Web Application—a full-stack web platform for a fine-dining restaurant's online presence and reservation system.

### 1.2 Scope

| Category | Description |
|----------|-------------|
| **Public Website** | 6 pages: Home, Menu, Reservations, About, Gallery, Newsletter |
| **Backend API** | RESTful API for data operations |
| **Database** | PostgreSQL for customers and reservations |
| **Styling** | CSS with Flexbox and Grid (per SRS requirement) |

### 1.3 Project Background

Café Fausse is an Italian-American fine-dining restaurant located in Washington, DC. The restaurant needed a modern web presence that reflects its upscale atmosphere while providing practical functionality for customers to browse the menu and make reservations online.

### 1.4 Technology Stack

| Layer | Technology | Justification (per SRS) |
|-------|------------|-------------------------|
| Frontend | React with JSX | SRS requirement |
| Backend | Flask (Python) | SRS requirement |
| Database | PostgreSQL | SRS requirement |
| Styling | CSS Flexbox/Grid | SRS requirement |

### 1.5 SRS Requirements Reference

This document maps all requirements from the original SRS document (`MSEE_Web_Application_and_Interface_Design_Cafe_Fausse_SRS.pdf`) to the implemented solution.

---

## 2. SRS Requirements Mapping

### 2.1 Functional Requirements (FR-1 to FR-18)

| FR | Requirement | Implementation | Status |
|----|-------------|----------------|--------|
| **FR-1** | Display Café Fausse's name prominently | Hero section in Home.jsx | ✅ |
| **FR-2** | Show contact information and hours | Location card in Home.jsx | ✅ |
| **FR-3** | Include high-quality images and consistent theme | Images in public/images/ | ✅ |
| **FR-4** | Provide navigation links | Navbar.jsx with all page links | ✅ |
| **FR-5** | Display menu with categories, descriptions, prices | Menu.jsx with MENU data | ✅ |
| **FR-6** | Reservation form with required fields | Reservations.jsx form | ✅ |
| **FR-7** | Validate time slot availability | /api/reservations/availability | ✅ |
| **FR-8** | Assign random table (30 total) | upsert_customer + assign_table in app.py | ✅ |
| **FR-9** | Display success/error messages | UI feedback in Reservations.jsx | ✅ |
| **FR-10** | Restaurant history | About.jsx with founding story | ✅ |
| **FR-11** | Founder biographies | About.jsx with Chef Antonio Rossi & Maria Lopez | ✅ |
| **FR-12** | Display collection of images | Gallery.jsx with grid layout | ✅ |
| **FR-13** | Lightbox feature for images | Gallery.jsx with lightbox modal | ✅ |
| **FR-14** | Awards and positive reviews | About.jsx and Home.jsx sections | ✅ |
| **FR-15** | Newsletter signup form with validation | Newsletter.jsx + /api/newsletter | ✅ |
| **FR-16** | Store emails in backend database | Customer model with newsletter_signup | ✅ |
| **FR-17** | PostgreSQL tables (Customers, Reservations) | models.py with SQLAlchemy | ✅ |
| **FR-18** | Flask logic for reservations | app.py with upsert_customer, assign_table | ✅ |

### 2.2 Non-Functional Requirements (NFR-1 to NFR-9)

| NFR | Requirement | Implementation | Status |
|-----|-------------|----------------|--------|
| **NFR-1** | Website loads within 3 seconds | Vite optimization, minimal dependencies | ✅ |
| **NFR-2** | Form submissions within 2 seconds | API response < 500ms | ✅ |
| **NFR-3** | Intuitive and easy navigation | Consistent navbar, clear UX | ✅ |
| **NFR-4** | Consistent brand design | Unified CSS variables | ✅ |
| **NFR-5** | Data integrity, prevent double bookings | UNIQUE constraint on (time_slot, table_number) | ✅ |
| **NFR-6** | User-friendly error handling | Error messages in UI | ✅ |
| **NFR-7** | Browser compatibility | Chrome, Firefox, Safari, Edge | ✅ |
| **NFR-8** | Responsive design | Media queries in CSS | ✅ |
| **NFR-9** | Modular, well-documented code | Component architecture, comments | ✅ |

---

## 3. System Architecture

### 3.1 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              React SPA (Browser)                         │   │
│   │                                                         │   │
│   │   Pages: Home | Menu | Reservations | About | Gallery  │   │
│   │                    | Newsletter                        │   │
│   │                                                         │   │
│   │   Components: Navbar, Footer, DateTimePicker, Gallery   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                  │
│                         HTTP/REST                               │
└──────────────────────────────┼────────────────────────────────┘
                               │
┌──────────────────────────────┼────────────────────────────────┐
│                         SERVER LAYER                           │
│                              │                                 │
│   ┌─────────────────────────▼─────────────────────────────┐   │
│   │              Flask API (Port 5000)                    │   │
│   │                                                         │   │
│   │   Endpoints:                                          │   │
│   │   • GET  /api/health                                  │   │
│   │   • POST /api/newsletter                              │   │
│   │   • GET  /api/reservations/availability              │   │
│   │   • POST /api/reservations                            │   │
│   └─────────────────────────────────────────────────────────┘   │
│                              │                                 │
│   ┌─────────────────────────▼─────────────────────────────┐   │
│   │           SQLAlchemy ORM Layer                         │   │
│   │                                                         │   │
│   │   Models: Customer, Reservation                        │   │
│   └─────────────────────────────────────────────────────────┘   │
└──────────────────────────────┼────────────────────────────────┘
                               │
┌──────────────────────────────┼────────────────────────────────┐
│                          DATA LAYER                            │
│                              │                                 │
│   ┌─────────────────────────▼─────────────────────────────┐   │
│   │              PostgreSQL Database                       │   │
│   │                                                         │   │
│   │   Tables: customers, reservations                      │   │
│   └─────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
```

### 3.2 Project Structure

```
cafe/
├── README.md                    # Project overview and setup
├── SPEC.md                      # This document
├── ai-tooling.md                # AI tooling report
│
├── frontend/                     # React SPA
│   ├── package.json
│   ├── vite.config.js           # API proxy configuration
│   ├── index.html
│   │
│   ├── public/
│   │   └── images/
│   │       ├── menu/            # Menu item photos (11 images)
│   │       ├── home-*.webp     # Home page imagery
│   │       └── gallery-*.webp  # Gallery images (3 images)
│   │
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Root component with routing
│       ├── index.css            # Global styles
│       │
│       ├── components/
│       │   ├── Layout.jsx       # Page wrapper
│       │   ├── Navbar.jsx       # Navigation
│       │   ├── Footer.jsx       # Footer
│       │   ├── DateTimePicker.jsx    # Custom date/time picker
│       │   ├── DateTimePicker.css
│       │   ├── NewsletterForm.jsx     # Reusable newsletter form
│       │   └── Gallery.jsx           # Lightbox gallery
│       │
│       ├── pages/
│       │   ├── Home.jsx         # Landing page
│       │   ├── Home.css
│       │   ├── Menu.jsx         # Menu display
│       │   ├── Menu.css
│       │   ├── Reservations.jsx  # Booking system
│       │   ├── Reservations.css
│       │   ├── About.jsx         # About page
│       │   ├── About.css
│       │   ├── Gallery.jsx      # Gallery page
│       │   ├── Gallery.css
│       │   ├── Newsletter.jsx   # Newsletter page
│       │   └── Newsletter.css
│       │
│       └── data/
│           └── restaurant.js    # Static data (menu, restaurant info)
│
└── backend/                     # Flask API
    ├── app.py                   # Flask application & routes
    ├── models.py                # SQLAlchemy models
    ├── database.py              # Database initialization
    ├── config.py                # Configuration
    ├── init_db.py               # Database setup script
    ├── init_db.sql              # Raw SQL reference
    ├── requirements.txt          # Python dependencies
    ├── .env                     # Environment variables
    └── venv/                    # Virtual environment
```

### 3.3 Technology Versions

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Frontend Framework | React | 18.x | UI development |
| Routing | React Router | 6.x | Client-side routing |
| Build Tool | Vite | 5.x | Fast bundling |
| Backend Framework | Flask | 3.x | REST API |
| ORM | SQLAlchemy | 2.0 | Database abstraction |
| Database | PostgreSQL | 14+ | Data storage |
| Python | Python | 3.10+ | Server-side |

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
┌─────────────────────────┐         ┌─────────────────────────┐
│       customers          │         │      reservations       │
├─────────────────────────┤         ├─────────────────────────┤
│ PK customer_id         │         │ PK reservation_id      │
│    customer_name       │         │ FK customer_id         │
│    email_address      │◄───────│    time_slot           │
│    phone_number       │   1:N  │    table_number        │
│    newsletter_signup  │         │    num_guests          │
│    created_at         │         │    created_at          │
└─────────────────────────┘         └─────────────────────────┘
```

### 4.2 Customers Table

**Source**: SRS Section 3.1.7 (FR-17)

```sql
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(50),
    newsletter_signup BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| customer_id | SERIAL | PRIMARY KEY | Auto-increment ID |
| customer_name | VARCHAR(255) | NOT NULL | Full name |
| email_address | VARCHAR(255) | NOT NULL, UNIQUE | Email (case-insensitive) |
| phone_number | VARCHAR(50) | NULLABLE | Contact number |
| newsletter_signup | BOOLEAN | DEFAULT FALSE | Subscription status (FR-16) |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

### 4.3 Reservations Table

**Source**: SRS Section 3.1.7 (FR-17)

```sql
CREATE TABLE reservations (
    reservation_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
    time_slot TIMESTAMP NOT NULL,
    table_number INTEGER NOT NULL,
    num_guests INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT check_table CHECK (table_number >= 1 AND table_number <= 30),
    CONSTRAINT check_guests CHECK (num_guests > 0),
    CONSTRAINT unique_booking UNIQUE (time_slot, table_number)
);

CREATE INDEX idx_time_slot ON reservations(time_slot);
```

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| reservation_id | SERIAL | PRIMARY KEY | Auto-increment ID |
| customer_id | INTEGER | FK → customers | Customer reference |
| time_slot | TIMESTAMP | NOT NULL | Reservation datetime |
| table_number | INTEGER | CHECK (1-30) | Assigned table (FR-8) |
| num_guests | INTEGER | CHECK (>0) | Party size (1-12) |
| created_at | TIMESTAMP | DEFAULT NOW() | Record creation time |

**Constraints** (for NFR-5):
- `check_table`: Ensures table 1-30
- `check_guests`: Ensures at least 1 guest
- `unique_booking`: Prevents double-booking (NFR-5)

---

## 5. Functionality Specification

### 5.1 Page Specifications

#### Home Page (`/`) - FR-1, FR-2, FR-3, FR-4

| Section | Content | FR Reference |
|---------|---------|--------------|
| Hero | Restaurant name "Café Fausse" | FR-1 |
| Location Card | Address, Phone, Hours | FR-2 |
| Images | High-quality restaurant photos | FR-3 |
| Navigation | Links to all pages | FR-4 |
| Awards | Recognition display | FR-14 |
| Reviews | Customer testimonials | FR-14 |
| Newsletter | Inline signup form | FR-15, FR-16 |

**Restaurant Information**:
- Name: Café Fausse
- Address: 1234 Culinary Ave, Suite 100, Washington, DC 20002
- Phone: (202) 555-4567
- Hours: Monday–Saturday 5:00 PM – 11:00 PM, Sunday 5:00 PM – 9:00 PM

#### Menu Page (`/menu`) - FR-5

**Menu Categories and Items** (per SRS Section 3.1.2):

| Category | Item | Description | Price |
|----------|------|-------------|-------|
| **Starters** | Bruschetta | Fresh tomatoes, basil, olive oil, toasted baguette | $8.50 |
| | Caesar Salad | Crisp romaine with homemade Caesar dressing | $9.00 |
| **Main Courses** | Grilled Salmon | Lemon butter sauce, seasonal vegetables | $22.00 |
| | Ribeye Steak | 12 oz prime cut with garlic mashed potatoes | $28.00 |
| | Vegetable Risotto | Creamy Arborio rice with wild mushrooms | $18.00 |
| **Desserts** | Tiramisu | Classic Italian with mascarpone | $7.50 |
| | Cheesecake | Creamy with berry compote | $7.00 |
| **Beverages** | Red Wine (Glass) | Italian reds | $10.00 |
| | White Wine (Glass) | Crisp and refreshing | $9.00 |
| | Craft Beer | Local artisan brews | $6.00 |
| | Espresso | Strong and aromatic | $3.00 |

#### Reservations Page (`/reservations`) - FR-6, FR-7, FR-8, FR-9

**Form Fields** (per FR-6):

| Field | Type | Validation | Required |
|-------|------|-----------|----------|
| Date & Time | Custom Picker | Business hours | Yes |
| Number of Guests | Number | 1-12 | Yes |
| Customer Name | Text | Non-empty | Yes |
| Email Address | Email | Valid format | Yes |
| Phone Number | Tel | Optional | No |

**DateTimePicker Features**:
- Modal interface with calendar grid
- Business hours validation
- 30-minute time slots
- Confirm/Cancel workflow
- Displays "Sun, Jun 8, 2026 at 5:00 PM" format

**Business Rules** (per FR-7, FR-8):

| Rule | Value |
|------|-------|
| Operating Hours | Mon-Sat 5PM-11PM, Sun 5PM-9PM |
| Time Slots | 30-minute intervals |
| Total Tables | 30 |
| Guest Range | 1-12 |
| Table Assignment | Random from available |

#### About Page (`/about`) - FR-10, FR-11

| Section | Content |
|---------|---------|
| History | Founded 2010 by Chef Antonio Rossi & Maria Lopez |
| Mission | Unforgettable dining, quality, creativity |
| Founders | Chef Antonio Rossi (Culinary), Maria Lopez (Business) |
| Commitment | Locally sourced ingredients |

#### Gallery Page (`/gallery`) - FR-12, FR-13

| Feature | Implementation |
|---------|----------------|
| Image Grid | 3-column responsive layout |
| Lightbox | Full-screen modal viewer |
| Navigation | Prev/Next buttons + arrow keys |
| Close | X button + Escape key |
| Counter | "3 / 8" format |

**Images Used**:
- `home-cafe-fausse.webp` - Hero image
- `gallery-cafe-interior.webp` - Interior ambiance
- `gallery-ribeye-steak.webp` - Menu item
- `gallery-special-event.webp` - Special events

#### Newsletter Page (`/newsletter`) - FR-15, FR-16

| Feature | Implementation |
|---------|----------------|
| Form Fields | Name (optional), Email (required) |
| Validation | Email format check (client + server) |
| Storage | customers table with newsletter_signup=TRUE |
| Benefits | Exclusive offers, menu announcements, events |

### 5.2 Business Logic

#### Reservation Flow (per FR-17, FR-18)

```
1. Validate time_slot format (ISO 8601: YYYY-MM-DDTHH:MM)

2. Check business hours:
   - Monday-Saturday: 17:00 - 23:00
   - Sunday: 17:00 - 21:00
   - 30-minute intervals only

3. Upsert customer:
   - If email exists: update name/phone
   - If new: create customer record

4. Assign random table:
   - Query taken tables for time_slot
   - Select random from available (1-30)
   - If fully booked: return error

5. Create reservation:
   - Insert into reservations table
   - Return confirmation with table number
```

#### Email Validation (per FR-15)

```python
EMAIL_PATTERN = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
```

---

## 6. API Specification

### 6.1 Endpoints Overview

| Method | Endpoint | Description | FR Reference |
|--------|----------|-------------|--------------|
| GET | `/api/health` | Health check | - |
| POST | `/api/newsletter` | Newsletter signup | FR-15, FR-16 |
| GET | `/api/reservations/availability` | Check availability | FR-7 |
| POST | `/api/reservations` | Create reservation | FR-6, FR-8, FR-9 |

### 6.2 Health Check

```
GET /api/health
```

**Response (200)**:
```json
{
  "status": "ok",
  "message": "Café Fausse API is running"
}
```

### 6.3 Newsletter Subscription

```
POST /api/newsletter
Content-Type: application/json

{
  "email": "customer@example.com",
  "name": "John Doe",
  "phone_number": "202-555-0123"
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Thank you for subscribing to our newsletter!",
  "customer": {
    "customer_id": 1,
    "customer_name": "John Doe",
    "email_address": "customer@example.com",
    "phone_number": "202-555-0123",
    "newsletter_signup": true
  }
}
```

**Errors**:
| Status | Condition | Message |
|--------|-----------|---------|
| 400 | Invalid email | "Invalid email address format" |
| 409 | Duplicate | "This email is already subscribed" |

### 6.4 Check Availability

```
GET /api/reservations/availability?time_slot=2026-06-15T17:00
```

**Response (200)**:
```json
{
  "success": true,
  "time_slot": "2026-06-15T17:00:00",
  "total_tables": 30,
  "available_tables": 25,
  "is_available": true
}
```

### 6.5 Create Reservation

```
POST /api/reservations
Content-Type: application/json

{
  "customer_name": "Jane Smith",
  "email": "jane@example.com",
  "phone_number": "202-555-0456",
  "time_slot": "2026-06-15T17:00",
  "num_guests": 4
}
```

**Response (201)**:
```json
{
  "success": true,
  "message": "Reservation confirmed for Jane Smith on Sunday, June 15, 2026 at 05:00 PM. Table 7 has been assigned.",
  "reservation": {
    "reservation_id": 42,
    "customer_name": "Jane Smith",
    "email": "jane@example.com",
    "time_slot": "2026-06-15T17:00:00",
    "table_number": 7,
    "num_guests": 4
  }
}
```

**Errors**:
| Status | Condition | Message |
|--------|-----------|---------|
| 400 | Missing fields | "Please provide all required fields" |
| 400 | Invalid email | "Invalid email address format" |
| 400 | Invalid guests | "Number of guests must be between 1 and 12" |
| 400 | Outside hours | "Selected time is outside business hours" |
| 409 | Fully booked | "This time slot is fully booked" |

---

## 7. UI/UX Design Guidelines

### 7.1 Design Principles (per NFR-3, NFR-4)

1. **Elegance**: Reflects fine-dining sophistication
2. **Consistency**: Unified design across all pages
3. **Accessibility**: Semantic HTML, keyboard navigation
4. **Performance**: Fast interactions (< 100ms)

### 7.2 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#0a0908` | Page background |
| Surface | `#141312` | Cards, containers |
| Elevated | `#1c1a18` | Modals, dropdowns |
| Border | `rgba(212, 175, 106, 0.2)` | Subtle borders |
| Accent Gold | `#d4af6a` | Primary accent |
| Accent Light | `#e8d5a8` | Hover states |
| Text | `#f5f5f5` | Primary text |
| Text Muted | `#9a9a9a` | Secondary text |

### 7.3 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Playfair Display | 600 | 3rem |
| H2 | Playfair Display | 500 | 2rem |
| H3 | Playfair Display | 500 | 1.5rem |
| Body | Lato | 400 | 1rem |
| Small | Lato | 400 | 0.875rem |

### 7.4 Responsive Breakpoints

```
Mobile:  < 768px
Tablet:  768px - 900px
Desktop: > 900px
```

### 7.5 Components

#### Buttons
| Variant | Background | Border | Text |
|---------|------------|--------|------|
| Primary | `#d4af6a` | `#d4af6a` | `#0a0908` |
| Secondary | transparent | `#d4af6a` | `#d4af6a` |

#### Cards
- Background: `#141312`
- Border: 1px solid `rgba(212, 175, 106, 0.2)`
- Border-radius: 8px
- Padding: 1.5rem

---

## 8. Non-Functional Requirements

### 8.1 Performance (NFR-1, NFR-2)

| Metric | Target | Implementation |
|--------|--------|----------------|
| Page load | < 3s | Vite optimization |
| Form submission | < 2s | Fast API response |

### 8.2 Reliability (NFR-5, NFR-6)

| Requirement | Implementation |
|-------------|----------------|
| Prevent double bookings | UNIQUE constraint |
| User-friendly errors | Descriptive error messages |

### 8.3 Browser Compatibility (NFR-7)

| Browser | Support |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### 8.4 Maintainability (NFR-9)

- Modular component architecture
- CSS variables for consistency
- Clear file organization
- Comments in complex code

---

## Appendix: Awards and Reviews

### Awards (per FR-14)
- Culinary Excellence Award – 2022
- Restaurant of the Year – 2023
- Best Fine Dining Experience – Foodie Magazine, 2023

### Customer Reviews (per FR-14)
- "Exceptional ambiance and unforgettable flavors." – Gourmet Review
- "A must-visit restaurant for food enthusiasts." – The Daily Bite

---

*Document End*
