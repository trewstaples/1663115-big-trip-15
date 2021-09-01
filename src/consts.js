const CITIES = ['New-York', 'Los-Angeles', 'Melbourne', 'Sydney', 'Chicago', 'Tokyo', 'Singapore', 'Dubai', 'Barcelona', 'Madrid'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
];

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OffersPriceList = {
  flight: {
    'Choose meal': 180,
    'Choose seats': 190,
    'Upgrade to comfort class': 100,
    'Upgrade to business class': 130,
  },
  restaurant: {
    'Play live music': 50,
    Booking: 180,
  },
  ship: {
    'Choose meal': 160,
    'Choose seats': 100,
    'Upgrade to comfort class': 100,
    'Upgrade to business class': 100,
    'Add luggage': 120,
  },
  sightseeing: {
    'Order an exursion': 200,
    'Add a guide': 150,
  },
  taxi: {
    'Upgrade to business class': 150,
    'Choose the radio station': 70,
    'Add water bottle': 40,
  },
  train: {
    'Order a breakfast': 120,
    'Order a tea': 100,
  },
};

const SortType = {
  DAY: 'sort-day',
  TIME: 'sort-time',
  PRICE: 'sort-price',
};

export { CITIES, DESCRIPTIONS, POINT_TYPES, OffersPriceList, SortType };
