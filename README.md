# Café Fausse

A full-stack web application for Café Fausse, a fine-dining restaurant in Washington, DC.

**Tech Stack**: React + Vite | Flask | PostgreSQL

---

## Project Overview

This web application was developed to provide Café Fausse with an elegant online presence and a functional table reservation system. The project includes six fully responsive pages, a newsletter subscription system, and a backend API with PostgreSQL database integration.

### Key Requirements Addressed

| Requirement | Implementation |
|-------------|----------------|
| 5+ Web Pages | 6 pages built with React and JSX |
| Contact Information | Address, phone, hours on Home and Footer |
| Menu Display | Categorized menu with pricing |
| About Us Page | Restaurant history and owner information |
| Newsletter Signup | Form with email validation, stored in database |
| Photo Gallery | Lightbox with keyboard navigation |
| Reservation System | 30 tables, 30-min slots, random table assignment |
| Awards/Reviews | Featured on Home page |
| Flexbox/Grid CSS | CSS implementation uses Flexbox and Grid layouts |

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React | 18 |
| Frontend Build | Vite | Latest |
| Backend | Flask | 3 |
| Database | PostgreSQL | 14+ |
| ORM | SQLAlchemy | Latest |

---

## Quick Start

### Prerequisites

| Software | Version | Download |
|----------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| Python | 3.10+ | [python.org](https://python.org) |
| PostgreSQL | 14+ | [postgresql.org](https://postgresql.org) |

---

### Step 1: Create Database

**Windows (PowerShell):**
```powershell
psql -U postgres -c "CREATE DATABASE cafe_fausse;"
```

**macOS / Linux (Terminal):**
```bash
psql -U postgres -c "CREATE DATABASE cafe_fausse;"
```

---

### Step 2: Backend Setup

**Windows (PowerShell / CMD):**
```powershell
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cafe_fausse > .env
echo FLASK_PORT=5000 >> .env

# Initialize database
python init_db.py

# Start server
python app.py
```

**macOS / Linux (Terminal):**
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo 'DATABASE_URL=postgresql://postgres:@localhost:5432/cafe_fausse' > .env
echo 'FLASK_PORT=5000' >> .env

# Initialize database
python init_db.py

# Start server
python app.py
```

---

### Step 3: Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

### Step 4: Access

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

---

## Project Structure

```
cafe_fausse/
├── backend/                    # Flask API
│   ├── app.py                 # API endpoints
│   ├── models.py              # SQLAlchemy models
│   ├── database.py            # Database initialization
│   ├── config.py              # Configuration
│   ├── init_db.py             # Database setup script
│   ├── requirements.txt        # Python dependencies
│   └── .env                   # Environment variables (local)
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── pages/            # 6 pages: Home, Menu, Reservations, About, Gallery, Newsletter
│   │   ├── components/       # Navbar, Footer, DateTimePicker, Gallery
│   │   ├── data/            # Menu & restaurant data
│   │   └── App.jsx          # Main app component
│   ├── index.html
│   └── package.json
│
├── SPEC.md                    # Software Requirements Specification
├── ai-tooling.md              # AI tooling documentation
├── staging.md                 # Staging deployment information
└── README.md
```

---

## Features

| Feature | Description |
|---------|-------------|
| **6 Pages** | Home, Menu, Reservations, About, Gallery, Newsletter |
| **Reservation System** | 30 tables, 30-min time slots, Mon-Sat 5PM-11PM, Sun 5PM-9PM |
| **Newsletter Signup** | Email validation, stored in PostgreSQL database |
| **Gallery** | Lightbox with hover effects, keyboard navigation (arrows, Escape) |
| **Responsive Design** | Desktop, tablet, and mobile support |
| **Random Table Assignment** | Backend assigns available table (1-30) automatically |

---

## Design & Implementation Decisions

### UI/UX Design
- **CSS Approach**: Custom CSS with CSS variables for theming
- **Layout**: Flexbox for navigation and alignment, Grid for gallery and menu
- **Visual Style**: Elegant, luxury restaurant aesthetic with smooth transitions

### Backend Architecture
- **RESTful API**: Four endpoints for health check, newsletter, and reservations
- **Database Schema**: Two tables (customers, reservations) with proper foreign key relationships
- **Business Logic**:
  - Validates 30-minute time slot intervals
  - Enforces business hours (Mon-Sat 5PM-11PM, Sun 5PM-9PM)
  - Rejects bookings when all 30 tables are occupied

### Reservation Flow
1. User selects date and time via DateTimePicker modal
2. Frontend validates input format
3. Backend checks availability for selected time slot
4. If available, system assigns random table (1-30)
5. Customer record created/updated, reservation stored
6. Confirmation returned to user

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/reservations/availability?time_slot=YYYY-MM-DDTHH:MM` | Check table availability |
| POST | `/api/reservations` | Create new reservation |

### Example - Check Availability
```bash
curl "http://localhost:5000/api/reservations/availability?time_slot=2026-06-15T17:00"
```

### Example - Create Reservation
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "email": "john@example.com",
    "phone": "202-555-1234",
    "time_slot": "2026-06-15T17:00",
    "num_guests": 2
  }'
```

---

## Database Schema

### Customers Table
| Column | Type | Constraints |
|--------|------|-------------|
| customer_id | SERIAL | PRIMARY KEY |
| customer_name | VARCHAR(255) | NOT NULL |
| email_address | VARCHAR(255) | NOT NULL, UNIQUE |
| phone_number | VARCHAR(50) | NULLABLE |
| newsletter_signup | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT NOW() |

### Reservations Table
| Column | Type | Constraints |
|--------|------|-------------|
| reservation_id | SERIAL | PRIMARY KEY |
| customer_id | INTEGER | FK → customers |
| time_slot | TIMESTAMP | NOT NULL |
| table_number | INTEGER | CHECK (1-30) |
| num_guests | INTEGER | CHECK (>0) |
| created_at | TIMESTAMP | DEFAULT NOW() |

---

## Restaurant Information

- **Name**: Café Fausse
- **Address**: 1234 Culinary Ave, Suite 100, Washington, DC 20002
- **Phone**: (202) 555-4567
- **Hours**:
  - Monday - Saturday: 5:00 PM - 11:00 PM
  - Sunday: 5:00 PM - 9:00 PM

---

## Documentation

- [SPEC.md](SPEC.md) - Detailed software requirements specification
- [ai-tooling.md](ai-tooling.md) - AI tools used in development
- [staging.md](staging.md) - Staging deployment information

---

## Acknowledgments

- Restaurant images from MSEE_Web_Application_and_Interface_Design_Cafe_Fausse_Images folder
- Developed with assistance from AI-powered development tools
