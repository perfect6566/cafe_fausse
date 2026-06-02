# AI Tooling Report - Café Fausse Web Application

> **Report Date**: June 2026
> **Project**: Café Fausse Web Application
> **Course**: MS AI Engineering, George Washington University
> **AI Tools Used**: Cursor IDE (Primary), Claude (Documentation)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [AI Tools Used](#2-ai-tools-used)
3. [Development Workflow](#3-development-workflow)
4. [Implementation Details](#4-implementation-details)
5. [Challenges and Resolutions](#5-challenges-and-resolutions)
6. [Best Practices Identified](#6-best-practices-identified)
7. [Lessons Learned](#7-lessons-learned)
8. [Conclusion](#8-conclusion)

---

## 1. Executive Summary

This report documents the use of AI-powered development tools in the creation of the Café Fausse web application—a full-stack project built with React, Flask, and PostgreSQL.

### Project Overview

| Aspect | Details |
|--------|---------|
| **Frontend** | React 18 with JSX, Vite bundler |
| **Backend** | Flask 3 with SQLAlchemy ORM |
| **Database** | PostgreSQL |
| **Pages** | 6 (Home, Menu, Reservations, About, Gallery, Newsletter) |
| **AI Tools** | Cursor IDE, Claude |

### Key Outcomes

- **100%** of SRS requirements implemented
- **6** fully functional pages
- **4** API endpoints
- **2** database tables
- **10** React components

### Benefits of AI Assistance

| Benefit | Impact |
|---------|--------|
| Accelerated prototyping | Rapid component scaffolding generation |
| Consistent code style | Project-wide uniformity |
| Documentation efficiency | Comprehensive technical docs |
| Quick debugging | Fast issue identification and resolution |

---

## 2. AI Tools Used

### 2.1 Cursor IDE (Primary Tool)

**Purpose**: Core development assistance for code generation, debugging, and multi-file modifications.

| Feature | Usage | Effectiveness |
|---------|-------|---------------|
| AI Chat | Requirement clarification, debugging | High |
| Composer | Multi-file refactoring | High |
| Autocomplete | Boilerplate code generation | High |
| Inline suggestions | Real-time code improvements | Medium |

**Capabilities Utilized**:
- React component scaffolding
- Flask endpoint templates
- CSS styling with Flexbox/Grid
- Bug identification and fixing
- Project structure organization

### 2.2 Claude (Documentation)

**Purpose**: Complex documentation and technical specification writing.

| Feature | Usage | Effectiveness |
|---------|-------|---------------|
| Long-form writing | SRS, README, reports | Very High |
| Code review | Security and performance analysis | High |
| Architecture planning | System design recommendations | High |

**Capabilities Utilized**:
- Software Requirements Specification (SPEC.md)
- README.md enhancement
- AI tooling documentation (ai-tooling.md)
- Implementation checklist creation

### 2.3 Tool Comparison Matrix

| Capability | Cursor IDE | Claude | Best For |
|------------|-----------|--------|----------|
| Code Generation | ●●●● | ●● | Boilerplate, patterns |
| Multi-file Changes | ●●●● | ● | Large refactors |
| Bug Detection | ●●●● | ●●●● | Both tools complementary |
| Architecture Design | ●● | ●●●● | Complex system decisions |
| Documentation | ●● | ●●●● | Long-form technical writing |
| Debugging | ●●● | ●●●● | Root cause analysis |
| Performance Advice | ●● | ●●●● | Optimization strategies |

---

## 3. Development Workflow

### 3.1 Development Phases

```
┌─────────────────────────────────────────────────────────────────┐
│                  DEVELOPMENT LIFECYCLE WITH AI                   │
└─────────────────────────────────────────────────────────────────┘

  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │   PHASE 1    │     │   PHASE 2    │     │   PHASE 3    │
  │   Planning   │────▶│ Development  │────▶│  Refinement  │
  └──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
  │ SRS Review   │     │ AI-assisted  │     │ UI/UX Polish │
  │ AI Overview  │     │ Coding       │     │ Bug Fixing   │
  └──────────────┘     └──────────────┘     └──────────────┘
```

### Phase 1: Planning & Architecture (SRS Review)

**Activities**:
1. Load SRS document into AI tool
2. Review all functional requirements (FR-1 to FR-18)
3. Plan project structure
4. Define technology stack

**AI Contributions**:
- Technology stack recommendations (React + Flask + PostgreSQL)
- Project structure design
- API endpoint planning
- Database schema proposals

**Human Decisions**:
- Final technology choices based on project constraints
- Business logic implementation approach
- Component architecture decisions

### Phase 2: Implementation

**Frontend Development**:
| Component | Description | Lines |
|-----------|-------------|-------|
| Navbar.jsx | Navigation header | ~80 |
| Footer.jsx | Page footer | ~50 |
| Home.jsx | Hero, intro, reviews | ~110 |
| Menu.jsx | Categorized menu display | ~65 |
| Reservations.jsx | Booking form with DateTimePicker | ~200 |
| About.jsx | Restaurant history | ~80 |
| Gallery.jsx | Image grid with lightbox | ~120 |
| Newsletter.jsx | Subscription form | ~80 |
| DateTimePicker.jsx | Custom date/time selector | ~380 |
| NewsletterForm.jsx | Reusable form component | ~50 |

**Backend Development**:
| File | Description |
|------|-------------|
| app.py | Flask API with 4 endpoints |
| models.py | SQLAlchemy models (Customer, Reservation) |
| database.py | Database initialization |
| config.py | Configuration management |
| init_db.py | Database setup script |

**AI Contributions**:
- Component scaffolding generation
- CSS styling (Flexbox/Grid layouts)
- API endpoint templates
- Error handling patterns

**Human Oversight**:
- Business logic verification
- Input validation review
- User experience testing
- Database integrity checking

### Phase 3: Refinement

**Activities**:
- UI/UX polish and animation improvements
- Bug fixing and edge case handling
- Responsive design verification
- Cross-browser testing

---

## 4. Implementation Details

### 4.1 Frontend Architecture

**Technology Stack**:
- React 18 with functional components and hooks
- React Router v6 for client-side routing
- Vite for fast development and optimized builds
- CSS with custom properties (variables)

**Component Hierarchy**:
```
App.jsx
└── Layout.jsx
    ├── Navbar.jsx
    ├── [Page Components]
    │   ├── Home.jsx
    │   ├── Menu.jsx
    │   ├── Reservations.jsx
    │   ├── About.jsx
    │   ├── Gallery.jsx
    │   └── Newsletter.jsx
    └── Footer.jsx

Shared Components:
├── DateTimePicker.jsx (Custom calendar/time picker)
├── NewsletterForm.jsx
└── Gallery.jsx (Lightbox functionality)
```

### 4.2 Backend Architecture

**Flask API Endpoints**:

| Endpoint | Method | Function |
|----------|--------|----------|
| `/api/health` | GET | Health check |
| `/api/newsletter` | POST | Newsletter subscription |
| `/api/reservations/availability` | GET | Check table availability |
| `/api/reservations` | POST | Create reservation |

**Business Logic Implementation**:

```python
# Reservation workflow:
1. Validate time slot format (ISO 8601)
2. Check business hours (Mon-Sat 5PM-11PM, Sun 5PM-9PM)
3. Ensure 30-minute intervals
4. Upsert customer record
5. Assign random available table (1-30)
6. Create reservation or return error
```

### 4.3 Database Schema

**Customers Table**:
| Column | Type | Constraints |
|--------|------|-------------|
| customer_id | SERIAL | PRIMARY KEY |
| customer_name | VARCHAR(255) | NOT NULL |
| email_address | VARCHAR(255) | NOT NULL, UNIQUE |
| phone_number | VARCHAR(50) | NULLABLE |
| newsletter_signup | BOOLEAN | DEFAULT FALSE |
| created_at | TIMESTAMP | DEFAULT NOW() |

**Reservations Table**:
| Column | Type | Constraints |
|--------|------|-------------|
| reservation_id | SERIAL | PRIMARY KEY |
| customer_id | INTEGER | FK → customers |
| time_slot | TIMESTAMP | NOT NULL |
| table_number | INTEGER | CHECK (1-30) |
| num_guests | INTEGER | CHECK (>0) |
| created_at | TIMESTAMP | DEFAULT NOW() |

### 4.4 Key Features Implemented

**DateTimePicker Component** (380 lines):
- Modal interface with calendar grid
- Business hours validation
- 30-minute time slot intervals
- Confirm/Cancel workflow
- Visual feedback for selections

**Gallery Lightbox**:
- Grid layout with hover effects
- Full-screen image viewing
- Keyboard navigation (arrows, Escape)
- Image counter display

**Reservation System**:
- Real-time availability checking
- Random table assignment
- Email validation (client + server)
- Success/error messaging

---

## 5. Challenges and Resolutions

### 5.1 Technical Challenges

| Challenge | AI Approach | Human Resolution |
|-----------|------------|------------------|
| Date/Time formatting | Initial fix attempted | Root cause identified: `toISOString()` timezone offset |
| Database connection | Suggested checking .env | Configured DATABASE_URL properly |
| CSS specificity | Provided overrides | Adjusted cascade order |
| React Router setup | Generated template | Verified routing configuration |

### 5.2 DateTimePicker Date Offset Bug

**Problem**: Selected date showed incorrect day (e.g., user selected Sunday but confirmation showed Saturday).

**Root Cause**: 
- `toISOString()` converts local time to UTC, causing date offset
- Timezone differences between client and server

**AI Contribution**:
- Suggested checking timezone handling
- Provided alternative formatting functions

**Human Resolution**:
```javascript
// Fixed by extracting date part before 'T'
function formatDisplayDate(dateStr) {
  const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
  const [year, month, day] = datePart.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  // ...
}
```

### 5.3 UI/UX Decisions

| AI Suggestion | Human Decision | Rationale |
|---------------|---------------|-----------|
| Use emoji for icons | Rejected - SVG preferred | SVG provides consistent rendering |
| Inline date picker | Rejected - Modal chosen | Modal is cleaner and more focused |
| Basic error messages | Enhanced | More descriptive messages improve UX |
| Simple transitions | Improved | Luxury feel requires smoother animations |

### 5.4 Key Lessons from Challenges

1. **Timezone handling**: Always use local date extraction, not `toISOString()`
2. **CSS specificity**: Use explicit selectors over specificity battles
3. **Form validation**: Validate both client-side and server-side
4. **Business logic**: AI provides scaffolding, humans implement rules

---

## 6. Best Practices Identified

### 6.1 AI Collaboration Framework

```
┌─────────────────────────────────────────────────────────────────┐
│              AI COLLABORATION BEST PRACTICES                    │
└─────────────────────────────────────────────────────────────────┘

PLANNING PHASE
✓ Use AI for brainstorming and requirement analysis
✓ Use AI for architecture suggestions
✗ Don't rely solely on AI for final architecture decisions

IMPLEMENTATION PHASE
✓ Use AI for boilerplate and scaffolding
✓ Use AI for pattern suggestions
✓ Use AI for documentation drafts
✗ Don't trust AI for business logic without review
✗ Don't skip security considerations

REVIEW PHASE
✓ Use AI for code review suggestions
✓ Use AI for potential bug identification
✗ Don't use AI as the sole reviewer

DEPLOYMENT PHASE
✓ Use AI for deployment scripts
✓ Use AI for monitoring suggestions
✗ Don't trust AI for production security config
```

### 6.2 Code Review Checklist

When reviewing AI-generated code:

- [ ] Input validation is present and correct
- [ ] Error handling covers edge cases
- [ ] Security considerations addressed
- [ ] Performance implications understood
- [ ] Accessibility requirements met
- [ ] Browser compatibility verified
- [ ] Documentation is accurate

### 6.3 Effective Prompting Strategies

| Strategy | Example | Best Use Case |
|----------|---------|---------------|
| **Be Specific** | "Create a modal that opens on button click" | Feature requests |
| **Provide Context** | "This is a luxury restaurant site, use elegant styling" | Styling |
| **Iterate** | "Good, now add keyboard navigation" | Enhancements |
| **Review Request** | "Review this code for potential bugs" | Quality assurance |
| **Explain** | "Why is this error occurring?" | Debugging |

---

## 7. Lessons Learned

### 7.1 What Worked Well

**1. Rapid Prototyping**
- AI-generated scaffolding enabled quick design iteration
- Components could be generated, previewed, and modified rapidly

**2. Pattern Recognition**
- AI consistently provided correct patterns for:
  - React hooks usage (useState, useEffect, useMemo)
  - Flask endpoint structure
  - SQLAlchemy model definitions

**3. Documentation**
- AI-generated documentation was comprehensive
- Reduced documentation time significantly
- Maintained consistent formatting

**4. Bug Identification**
- AI quickly identified common issues:
  - Missing imports
  - Syntax errors
  - Type mismatches

### 7.2 What Needed Human Intervention

**1. Complex Business Logic**
- DateTimePicker business hours required careful specification
- Random table assignment logic needed verification

**2. Timezone Handling**
- AI initially used `toISOString()` without considering timezone offset
- This is a common pitfall requiring human awareness

**3. Accessibility**
- AI-generated markup sometimes lacked proper ARIA attributes
- WCAG compliance required human review

**4. CSS Specificity**
- AI-generated CSS had specificity conflicts
- Manual debugging resolved cascade issues

### 7.3 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────┐
│                      KEY TAKEAWAYS                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. AI is a collaborator, not a replacement for developers       │
│                                                                  │
│  2. Always review AI-generated code for security and correctness │
│                                                                  │
│  3. Complex business logic requires human specification          │
│                                                                  │
│  4. AI excels at boilerplate, patterns, and documentation       │
│                                                                  │
│  5. Testing remains essential regardless of AI assistance       │
│                                                                  │
│  6. Communication with AI improves with iteration               │
│                                                                  │
│  7. Project-specific conventions require human setup            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Conclusion

### Summary

The Café Fausse web application was successfully developed with significant assistance from AI-powered development tools. The project demonstrates the effectiveness of human-AI collaboration in modern software development.

### Project Deliverables

| Deliverable | Status | AI Contribution |
|-------------|--------|-----------------|
| 6 React Pages | Complete | ~60% AI-generated |
| Flask Backend (4 endpoints) | Complete | ~70% AI-generated |
| PostgreSQL Database | Complete | ~50% AI-generated |
| DateTimePicker Component | Complete | ~40% AI-generated (complex) |
| Gallery Lightbox | Complete | ~50% AI-generated |
| README.md | Complete | ~80% AI-assisted |
| SPEC.md | Complete | ~70% AI-assisted |
| This Report | Complete | ~60% AI-assisted |

### Success Factors

1. **Clear Human-AI Boundaries**
   - AI handled scaffolding and patterns
   - Humans handled business logic and security

2. **Iterative Refinement**
   - Multiple AI suggestions were reviewed and improved
   - Continuous feedback loop improved output quality

3. **Project Context**
   - Established patterns and conventions guided AI
   - SRS document provided clear requirements

4. **Quality Focus**
   - Testing and review remained human responsibilities
   - Manual verification of critical functionality

### Final Assessment

| Aspect | Contribution |
|--------|--------------|
| **AI Contribution** | ~40-50% of implementation effort |
| **Human Contribution** | ~50-60% of implementation effort |
| **Quality Result** | Production-ready application meeting all SRS requirements |

### Recommendations for Future Projects

1. **Start with requirements**: Load SRS into AI tool before coding
2. **Establish conventions**: Define project-specific patterns early
3. **Iterate frequently**: Don't accept first AI response as final
4. **Review always**: Human oversight essential for quality
5. **Document interactions**: Keep track of AI decisions for learning

---

*The combination of AI assistance and human expertise produced a robust, well-documented web application that successfully meets all specified requirements for the Café Fausse restaurant.*
