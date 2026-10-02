// Fictional example locations for the AccessNearby project

export const locations = [
  {
    id: 1,
    name: 'Riverside Community Library',
    suburb: 'Brisbane',
    postcode: '4000',
    category: 'Library',
    image: 'accessible-entrance.jpg',
    address: 'Brisbane QLD 4000',
    hours: 'Mon–Fri, 9am–5pm',
    rating: '5/5',
    features: {
      ramp: true,
      lift: true,
      toilet: true,
      parking: true,
      doors: true
    }
  },
  {
    id: 2,
    name: 'Parkside Community Centre',
    suburb: 'New Farm',
    postcode: '4005',
    category: 'Community Centre',
    image: 'accessible-parking.jpg',
    features: {
      ramp: true,
      lift: false,
      toilet: true,
      parking: true,
      doors: false
    }
  },
  {
    id: 3,
    name: 'Central Learning Hub',
    suburb: 'South Brisbane',
    postcode: '4101',
    category: 'Education',
    image: 'accessible-lift.jpg',
    features: {
      ramp: true,
      lift: true,
      toilet: true,
      parking: false,
      doors: true
    }
  },
  {
    id: 4,
    name: 'West End Activity Centre',
    suburb: 'West End',
    postcode: '4101',
    category: 'Community Centre',
    image: 'accessible-entrance.jpg',
    features: {
      ramp: true,
      lift: false,
      toilet: false,
      parking: false,
      doors: true
    }
  }
]