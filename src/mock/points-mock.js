import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
getRandomInteger;

const generateDateFrom = () => dayjs().startOf('hour').toDate();
const daysGap = getRandomInteger(1, 30);
const generateDateT0 = () => dayjs().add(daysGap, 'day').toDate();

const generateDestination = () => {
  const cities = [
    'New-York',
    'Los-Angeles',
    'Melbourne',
    'Sydney',
    'Chicago',
    'Tokyo',
    'Singapore',
    'Dubai',
    'Barcelona',
    'Madrid',
  ];

  const randomIndex = getRandomInteger(0, cities.length - 1);

  return cities[randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateOffers = () => {
  const offers = [
    {
      title: 'Choose meal',
      price: 180,
    },
    {
      title: 'Upgrade to comfort class',
      price: 50,
    },
    {
      title: 'Choose seats',
      price: '100',
    },
  ];

  const randomIndex = getRandomInteger(0, offers.length - 1);

  return offers[randomIndex];
};

const generateType = () => {
  const types = [
    'taxi',
    'bus',
    'train',
    'ship',
    'drive',
    'flight',
    'check-in',
    'sightseeing',
    'restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generatePoint = (index) => {
  const dateFrom = generateDateFrom();
  const dateTo = generateDateT0();
  return {
    basePrice: getRandomInteger(20, 600),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    id: index + 1,
    info: [
      {
        description: generateDescription(),
        src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 4)}`,
      },
    ],
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(),
    type: generateType(),
  };
};

export { generatePoint };
