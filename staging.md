# Staging Deployment

> **Status**: Deployed and Active

---

## Live Application

**Frontend URL**: http://39.105.109.252:5173/

**Backend API**: http://39.105.109.252:5000

**API Health Check**: http://39.105.109.252:5000/api/health

---

## Server Configuration

| Component | Value |
|-----------|-------|
| **Cloud Provider** | Alibaba Cloud |
| **Frontend Port** | 5173 |
| **Backend Port** | 5000 |
| **Database Port** | 5432 |

---

## Database Configuration

| Setting | Value |
|---------|-------|
| **Host** | 39.105.109.252 |
| **Port** | 5432 |
| **Database** | cafe_fausse |
| **Username** | postgres |
| **Password** | *(Set in backend/.env on server)* |

---

## Deployment Summary

| Component | Status | Location |
|-----------|--------|----------|
| Frontend | Running | http://39.105.109.252:5173/ |
| Backend API | Running | http://39.105.109.252:5000 |
| PostgreSQL | Active | 39.105.109.252:5432 |

---

## Verified Functionality

All tests were executed on 2026-06-02 via API calls to the staging server.

### API Tests

| Test | Endpoint | Expected | Actual | Result |
|------|----------|----------|--------|--------|
| Health Check | `GET /api/health` | `{"status":"ok"}` | `{"status":"ok"}` | Pass |
| Newsletter Signup | `POST /api/newsletter` | Create subscriber | `customer_id: 59` created | Pass |
| Reservation Availability | `GET /api/reservations/availability?time_slot=2026-06-15T18:00` | 30 tables available | `available_tables: 30` | Pass |
| Create Reservation | `POST /api/reservations` | Confirm booking | Table assigned, reservation_id returned | Pass |
| Email Validation | `POST /api/newsletter` with invalid email | Reject request | `"Please enter a valid email address."` | Pass |

### Reservation System Tests

| Test | Description | Result |
|------|-------------|--------|
| Random Table Assignment | 5 reservations at same time | Tables 11, 18, 21, 25, 27 assigned randomly | Pass |
| 30-Table Limit | Booked 30 tables, then attempted 31st | 31st blocked with "fully booked" message | Pass |
| Sunday Hours | Reservation at 9PM (21:00) on Sunday | Accepted (within Sun hours 5PM-9PM) | Pass |

### Capacity Test - 30 Table Limit

```
Test Date: 2026-06-02
Target Time Slot: June 25, 2026 at 7:00 PM
Method: Created 31 consecutive reservations via POST /api/reservations

Results:
- Reservations 1-30: Successfully booked (Tables assigned 1-30)
- Reservation 31: BLOCKED
  Message: "This time slot is fully booked. Please choose another time."

Conclusion: System correctly enforces 30-table maximum capacity.
```

---

## Feature Checklist

| Project Requirement | Status | Notes |
|--------------------|--------|-------|
| 5+ Web Pages | Pass | 6 pages implemented |
| Contact Information | Pass | Address, phone, hours on site |
| Menu Display | Pass | Categorized with pricing |
| About Us Page | Pass | Restaurant info included |
| Newsletter Signup | Pass | Email validation working |
| Photo Gallery | Pass | Lightbox implemented |
| Reservation System | Pass | 30 tables, 30-min slots |
| CSS Flexbox/Grid | Pass | Layout uses both |
| Flask Backend | Pass | 4 API endpoints working |
| PostgreSQL Database | Pass | Customers & Reservations tables |
| Random Table Assignment | Pass | Tables randomly assigned |
| Full Capacity Rejection | Pass | 31st booking rejected |

---

## Local Development vs Staging

| Aspect | Local | Staging |
|--------|-------|---------|
| **Frontend** | localhost:5173 | 39.105.109.252:5173 |
| **Backend** | localhost:5000 | 39.105.109.252:5000 |
| **Database** | Local PostgreSQL | Alibaba Cloud PostgreSQL |
| **Use Case** | Development/Testing | Production-ready demo |
