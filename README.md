# Café Fausse

A full-stack web application for Café Fausse, a fine-dining restaurant in Washington, DC.

**Tech Stack**: React + Vite | Flask | PostgreSQL

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
# Create database
psql -U postgres -c "CREATE DATABASE cafe_fausse;"

# Or using createdb
createdb cafe_fausse
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

**macOS (Terminal):**
```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate
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

**Linux (Ubuntu/Debian):**
```bash
cd backend

# Install system dependencies (if needed)
sudo apt install python3-venv libpq-dev

# Create virtual environment
python3 -m venv venv

# Activate
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

**Linux (Fedora/RHEL):**
```bash
cd backend

# Install system dependencies
sudo dnf install python3 python3-pip postgresql-libs

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
# ... rest same as above
```

---

### Step 3: Frontend Setup

**All Platforms:**
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
cafe/
├── backend/           # Flask API
│   ├── app.py        # API endpoints
│   ├── models.py     # Database models
│   ├── init_db.py    # Database setup
│   └── requirements.txt
│
└── frontend/          # React app
    ├── src/
    │   ├── pages/    # 6 pages: Home, Menu, Reservations, About, Gallery, Newsletter
    │   ├── components/ # Navbar, Footer, DateTimePicker, Gallery
    │   └── data/      # Menu & restaurant data
    └── package.json
```

---

## Features

| Feature | Description |
|---------|-------------|
| **6 Pages** | Home, Menu, Reservations, About, Gallery, Newsletter |
| **Reservation System** | 30 tables, 30-min slots, Mon-Sat 5PM-11PM, Sun 5PM-9PM |
| **Newsletter** | Email signup with validation |
| **Gallery** | Lightbox with keyboard navigation |
| **Responsive** | Desktop, tablet, mobile support |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/newsletter` | Subscribe to newsletter |
| GET | `/api/reservations/availability?time_slot=YYYY-MM-DDTHH:MM` | Check availability |
| POST | `/api/reservations` | Create reservation |

**Example - Create Reservation:**
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "email": "john@example.com",
    "time_slot": "2026-06-15T17:00",
    "num_guests": 2
  }'
```

---

## Menu

| Category | Items | Prices |
|----------|-------|--------|
| Starters | Bruschetta, Caesar Salad | $8.50 - $9.00 |
| Main Courses | Grilled Salmon, Ribeye Steak, Vegetable Risotto | $18.00 - $28.00 |
| Desserts | Tiramisu, Cheesecake | $7.00 - $7.50 |
| Beverages | Red Wine, White Wine, Craft Beer, Espresso | $3.00 - $10.00 |

---

## Database

Two tables: `customers` and `reservations`

**Verify data:**
```sql
SELECT * FROM customers;
SELECT * FROM reservations;
```

---

## Restaurant Info

- **Address**: 1234 Culinary Ave, Suite 100, Washington, DC 20002
- **Phone**: (202) 555-4567
- **Hours**: Mon-Sat 5PM-11PM, Sun 5PM-9PM

---

## Documentation

- [SPEC.md](SPEC.md) - Detailed requirements specification
- [ai-tooling.md](ai-tooling.md) - AI tools used in development

---
