const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
getRandomInteger;

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

//Написать функцию, которая возвращает структура данных для точки маршрут
const generatePoint = () => ({
  type: generateType(),
  destination: 'New-York',
  offers: [
    {
      title: 'Choose meal',
      price: 180,
    },
    {
      title: 'Upgrade to comfort class',
      price: 50,
    },
  ],
  info: [
    {
      description: 'Chamonix parliament building',
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
    },
  ],
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  id: '0',
  isFavorite: false,
});
generatePoint();
