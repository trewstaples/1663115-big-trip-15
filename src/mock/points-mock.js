import dayjs from 'dayjs';
import { getRandomInteger, formatToFullDateAndTime } from '../utils.js';
import { CITIES, DESCRIPTIONS } from '../consts.js';

const MIX_BASE_PRICE = 20;
const MAX_BASE_PRICE = 600;
const MIN_PICTURES_VALUE = 1;
const MAX_PICTURES_VALUE = 6;
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

const generateDestinationValue = (consts) => consts[getRandomInteger(0, consts.length - 1)];

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

const generatePictures = (amount) =>
  new Array(amount).fill(null).map(() => ({
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: 'Picture description',
  }));

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
    destination: {
      description: generateDestinationValue(DESCRIPTIONS),
      name: generateDestinationValue(CITIES),
      pictures: generatePictures(getRandomInteger(MIN_PICTURES_VALUE, MAX_PICTURES_VALUE)),
    },
    duration,
    id: index + 1,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: generateOffers(),
    type: generateType(),
  };
};

export { generatePoint, getRandomInteger };
