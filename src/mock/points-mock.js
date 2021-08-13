import dayjs from 'dayjs';
import { getRandomInteger, formatToFullDateAndTime } from '../utils.js';

const MIX_BASE_PRICE = 20;
const MAX_BASE_PRICE = 600;
const MIN_MINUTES_GAP = 30;
const MAX_MINUTES_GAP = 1440;
const MAX_DAYS_GAP = 7;

const generateDateFrom = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day');
};

const generateDuration = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  return date2.diff(date1, 'minute');
};

const generateDestination = () => {
  const cities = ['New-York', 'Los-Angeles', 'Melbourne', 'Sydney', 'Chicago', 'Tokyo', 'Singapore', 'Dubai', 'Barcelona', 'Madrid'];

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
  const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generatePoint = (index) => {
  const dateFrom = generateDateFrom();
  const dateTo = dateFrom.add(getRandomInteger(MIN_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');
  const duration = generateDuration(dateFrom, dateTo);

  return {
    basePrice: getRandomInteger(MIX_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom: formatToFullDateAndTime(dateFrom),
    dateTo: formatToFullDateAndTime(dateTo),
    destination: generateDestination(),
    duration,
    id: index + 1,
    description: generateDescription(),
    src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 4)}`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(),
    type: generateType(),
  };
};

export { generatePoint, getRandomInteger };
