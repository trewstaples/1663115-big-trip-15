import dayjs from 'dayjs';
import { getRandomInteger, formatToFullDateAndTime, generateType, generateRandomOffersList } from '../utils.js';
import { CITIES, DESCRIPTIONS } from '../consts.js';

const MIX_BASE_PRICE = 20;
const MAX_BASE_PRICE = 600;
const MIN_PICTURES_VALUE = 1;
const MAX_PICTURES_VALUE = 6;
const MIN_MINUTES_GAP = 30;
const MAX_MINUTES_GAP = 2880;
const MAX_DAYS_GAP = 7;

const generateDateFrom = () => {
  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day');
};

const generateDestinationValue = (consts) => consts[getRandomInteger(0, consts.length - 1)];

const generatePictures = (amount) =>
  new Array(amount).fill(null).map(() => ({
    src: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: 'Picture description',
  }));

const generatePoint = (index) => {
  const dateFrom = generateDateFrom();
  const dateTo = dateFrom.add(getRandomInteger(MIN_MINUTES_GAP, MAX_MINUTES_GAP), 'minute');
  const type = generateType();

  return {
    basePrice: getRandomInteger(MIX_BASE_PRICE, MAX_BASE_PRICE),
    dateFrom: formatToFullDateAndTime(dateFrom),
    dateTo: formatToFullDateAndTime(dateTo),
    destination: {
      description: generateDestinationValue(DESCRIPTIONS),
      name: generateDestinationValue(CITIES),
      pictures: generatePictures(getRandomInteger(MIN_PICTURES_VALUE, MAX_PICTURES_VALUE)),
    },
    id: index + 1,
    isFavorite: Boolean(getRandomInteger()),
    offers: generateRandomOffersList(type),
    type,
  };
};

export { generatePoint, getRandomInteger };
