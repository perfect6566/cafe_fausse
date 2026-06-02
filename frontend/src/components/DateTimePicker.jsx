import { useMemo, useState, useRef, useEffect } from 'react'
import './DateTimePicker.css'

const BUSINESS_HOURS = {
  weekday: { start: 17, end: 23 },
  sunday: { start: 17, end: 21 },
}

function getBusinessHours(date) {
  const isSunday = date.getDay() === 0
  return isSunday ? BUSINESS_HOURS.sunday : BUSINESS_HOURS.weekday
}

function formatLocalDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function generateTimeSlotsForDate(date) {
  const slots = []
  const { start, end } = getBusinessHours(date)
  const now = new Date()

  for (let hour = start; hour <= end; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === end && minute === 30) continue

      const slot = new Date(date)
      slot.setHours(hour, minute, 0, 0)

      if (slot <= now) continue

      const label = slot.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      const value = `${formatLocalDate(date)}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

      slots.push({ value, label })
    }
  }
  return slots
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return ''
  try {
    // Extract date part before T if present
    const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr
    const parts = datePart.split('-').map(Number)
    if (parts.length !== 3) return ''
    const [year, month, day] = parts
    const date = new Date(year, month - 1, day)
    if (isNaN(date.getTime())) return ''
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function formatDisplayTime(value) {
  if (!value || !value.includes('T')) return ''
  try {
    const timePart = value.split('T')[1]
    if (!timePart) return ''
    const parts = timePart.split(':')
    const hours = parseInt(parts[0], 10)
    const minutes = parts[1]
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const displayHour = hours % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  } catch {
    return ''
  }
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DateTimePicker({ value, onChange, minDate = new Date() }) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      return new Date(value)
    }
    return today
  })

  const [selectedDate, setSelectedDate] = useState(() => {
    if (value && value.includes('T')) {
      const [year, month, day] = value.split('T')[0].split('-').map(Number)
      return new Date(year, month - 1, day)
    }
    return null
  })

  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const calendarDays = useMemo(() => {
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d))
    }
    return days
  }, [year, month, daysInMonth, firstDay])

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []
    return generateTimeSlotsForDate(selectedDate)
  }, [selectedDate])

  const selectedDateStr = selectedDate ? formatLocalDate(selectedDate) : ''
  const selectedTimeStr = value && value.includes('T') ? value.split('T')[1] : ''

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1))
  }

  function selectDate(date) {
    setSelectedDate(date)
    const slots = generateTimeSlotsForDate(date)
    if (slots.length > 0) {
      onChange(slots[0].value)
    } else {
      onChange('')
    }
  }

  function selectTime(timeValue) {
    onChange(timeValue)
    setIsOpen(false)
  }

  function openPicker() {
    setIsOpen(true)
  }

  function closePicker() {
    setIsOpen(false)
  }

  function isDateDisabled(date) {
    if (!date) return true
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d < minDate
  }

  function isDateSelected(date) {
    if (!date || !selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  function canGoPrev() {
    const prevMonthDate = new Date(year, month - 1, 1)
    return prevMonthDate >= new Date(today.getFullYear(), today.getMonth(), 1)
  }

  function handleClear() {
    setSelectedDate(null)
    onChange('')
    setIsOpen(false)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const displayText = value
    ? `${formatDisplayDate(value)} at ${formatDisplayTime(value)}`
    : 'Select date & time'

  const canConfirm = value && value.includes('T')

  return (
    <div className="datetime-picker-wrapper">
      <button
        ref={triggerRef}
        type="button"
        className={`datetime-picker-trigger ${value ? 'has-value' : ''}`}
        onClick={openPicker}
      >
        <span className="datetime-picker-icon">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
            <circle cx="12" cy="15" r="2"/>
            <path d="M12 13v-1"/>
          </svg>
        </span>
        <span className="datetime-picker-text">{displayText}</span>
      </button>

      {isOpen && (
        <div className="datetime-picker-modal" ref={modalRef}>
          <div className="datetime-picker-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="datetime-picker-header">
              <h3>Select Date & Time</h3>
              <button
                type="button"
                className="datetime-picker-close"
                onClick={closePicker}
                aria-label="Close"
              >
                &times;
              </button>
            </div>

            <div className="datetime-picker-body">
              <div className="calendar">
                <div className="calendar-header">
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={prevMonth}
                    disabled={!canGoPrev()}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <span className="calendar-title">
                    {MONTH_NAMES[month]} {year}
                  </span>
                  <button
                    type="button"
                    className="calendar-nav"
                    onClick={nextMonth}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>

                <div className="calendar-weekdays">
                  {DAY_NAMES.map((day) => (
                    <span key={day} className="calendar-weekday">{day}</span>
                  ))}
                </div>

                <div className="calendar-days">
                  {calendarDays.map((date, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`calendar-day ${!date ? 'empty' : ''} ${date && isDateDisabled(date) ? 'disabled' : ''} ${isDateSelected(date) ? 'selected' : ''}`}
                      onClick={() => date && !isDateDisabled(date) && selectDate(date)}
                      disabled={!date || isDateDisabled(date)}
                    >
                      {date ? date.getDate() : ''}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div className="time-slots">
                  <p className="time-slots-label">
                    Available times for {formatDate(selectedDate)}
                  </p>
                  {timeSlots.length > 0 ? (
                    <div className="time-slots-grid">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          className={`time-slot ${selectedTimeStr === slot.value.split('T')[1] ? 'selected' : ''}`}
                          onClick={() => selectTime(slot.value)}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="no-slots">No available times for this date.</p>
                  )}
                </div>
              )}
            </div>

            <div className="datetime-picker-footer">
              <button
                type="button"
                className="btn-clear"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={closePicker}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`btn-confirm ${!canConfirm ? 'disabled' : ''}`}
                onClick={canConfirm ? closePicker : undefined}
                disabled={!canConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
