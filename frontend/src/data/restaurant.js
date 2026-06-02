export const RESTAURANT = {
  name: 'Café Fausse',
  address: '1234 Culinary Ave, Suite 100, Washington, DC 20002',
  phone: '(202) 555-4567',
  hours: {
    weekday: 'Monday–Saturday: 5:00 PM – 11:00 PM',
    sunday: 'Sunday: 5:00 PM – 9:00 PM',
  },
}

export const IMAGES = {
  home: '/images/home-cafe-fausse.webp',
  interior: '/images/gallery-cafe-interior.webp',
  ribeye: '/images/gallery-ribeye-steak.webp',
  event: '/images/gallery-special-event.webp',
}

const MENU_IMAGES = {
  bruschetta: '/images/menu/bruschetta.jpg',
  caesarSalad: '/images/menu/caesar-salad.jpg',
  grilledSalmon: '/images/menu/grilled-salmon.jpg',
  ribeyeSteak: '/images/menu/ribeye-steak.webp',
  vegetableRisotto: '/images/menu/vegetable-risotto.jpg',
  tiramisu: '/images/menu/tiramisu.jpg',
  cheesecake: '/images/menu/cheesecake.jpg',
  redWine: '/images/menu/red-wine.jpg',
  whiteWine: '/images/menu/white-wine.jpg',
  craftBeer: '/images/menu/craft-beer.jpg',
  espresso: '/images/menu/espresso.jpg',
}

export const MENU = {
  starters: [
    {
      name: 'Bruschetta',
      description: 'Fresh tomatoes, basil, olive oil, and toasted baguette slices',
      price: 8.5,
      image: MENU_IMAGES.bruschetta,
      imagePosition: '50% 20%',
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine with homemade Caesar dressing',
      price: 9.0,
      image: MENU_IMAGES.caesarSalad,
      imagePosition: '50% 40%',
    },
  ],
  mainCourses: [
    {
      name: 'Grilled Salmon',
      description: 'Served with lemon butter sauce and seasonal vegetables',
      price: 22.0,
      image: MENU_IMAGES.grilledSalmon,
      imagePosition: '50% 50%',
    },
    {
      name: 'Ribeye Steak',
      description: '12 oz prime cut with garlic mashed potatoes',
      price: 28.0,
      image: MENU_IMAGES.ribeyeSteak,
      imagePosition: 'center',
    },
    {
      name: 'Vegetable Risotto',
      description: 'Creamy Arborio rice with wild mushrooms',
      price: 18.0,
      image: MENU_IMAGES.vegetableRisotto,
      imagePosition: '50% 50%',
    },
  ],
  desserts: [
    {
      name: 'Tiramisu',
      description: 'Classic Italian dessert with mascarpone',
      price: 7.5,
      image: MENU_IMAGES.tiramisu,
      imagePosition: '50% 30%',
    },
    {
      name: 'Cheesecake',
      description: 'Creamy cheesecake with berry compote',
      price: 7.0,
      image: MENU_IMAGES.cheesecake,
      imagePosition: '50% 45%',
    },
  ],
  beverages: [
    {
      name: 'Red Wine (Glass)',
      description: 'A selection of Italian reds',
      price: 10.0,
      image: MENU_IMAGES.redWine,
      imagePosition: '50% 35%',
    },
    {
      name: 'White Wine (Glass)',
      description: 'Crisp and refreshing',
      price: 9.0,
      image: MENU_IMAGES.whiteWine,
      imagePosition: '50% 50%',
    },
    {
      name: 'Craft Beer',
      description: 'Local artisan brews',
      price: 6.0,
      image: MENU_IMAGES.craftBeer,
      imagePosition: '50% 50%',
    },
    {
      name: 'Espresso',
      description: 'Strong and aromatic',
      price: 3.0,
      image: MENU_IMAGES.espresso,
      imagePosition: '50% 45%',
    },
  ],
}

export const AWARDS = [
  'Culinary Excellence Award – 2022',
  'Restaurant of the Year – 2023',
  'Best Fine Dining Experience – Foodie Magazine, 2023',
]

export const REVIEWS = [
  {
    quote: 'Exceptional ambiance and unforgettable flavors.',
    source: 'Gourmet Review',
  },
  {
    quote: 'A must-visit restaurant for food enthusiasts.',
    source: 'The Daily Bite',
  },
]

export const GALLERY_IMAGES = [
  {
    src: IMAGES.interior,
    alt: 'Elegant interior ambiance of Café Fausse',
    caption: 'Interior Ambiance',
  },
  {
    src: IMAGES.ribeye,
    alt: 'Ribeye steak dish from the menu',
    caption: 'Signature Ribeye Steak',
  },
  {
    src: IMAGES.event,
    alt: 'Special event at Café Fausse',
    caption: 'Special Events',
  },
  {
    src: IMAGES.home,
    alt: 'Café Fausse dining room',
    caption: 'Fine Dining Experience',
  },
]

export function formatPrice(price) {
  return `$${price.toFixed(2)}`
}

function toLocalDateTimeValue(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function generateTimeSlots(daysAhead = 14) {
  const slots = []
  const now = new Date()

  for (let dayOffset = 0; dayOffset <= daysAhead; dayOffset += 1) {
    const date = new Date(now)
    date.setHours(0, 0, 0, 0)
    date.setDate(date.getDate() + dayOffset)

    const isSunday = date.getDay() === 0
    const startHour = 17
    const endHour = isSunday ? 21 : 23

    for (let hour = startHour; hour <= endHour; hour += 1) {
      for (const minute of [0, 30]) {
        if (hour === endHour && minute === 30) {
          continue
        }

        const slot = new Date(date)
        slot.setHours(hour, minute, 0, 0)

        if (slot <= now) {
          continue
        }

        slots.push({
          value: toLocalDateTimeValue(slot),
          label: slot.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
          }),
        })
      }
    }
  }

  return slots
}
