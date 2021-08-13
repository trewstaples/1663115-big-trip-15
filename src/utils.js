import dayjs from 'dayjs';
import { POINT_TYPES } from './consts.js';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
getRandomInteger;

const formatToFullDateAndTime = (date) => dayjs(date).format('YYYY-MM-DDTHH:mm');
const formatToFullDate = (date) => dayjs(date).format('YYYY-MM-DD');
const formatToMonthAndDay = (date) => dayjs(date).format('MMM DD');
const formatToHoursAndMin = (date) => dayjs(date).format('HH:mm');

const generateType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generateOffersByType = () => {
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
const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;

const DURATION_DAY = 1;

const getDuration = (from, to) => {
  let duration = dayjs(to).diff(dayjs(from), 'millisecond');

  let formatString = '';

  if (duration >= MILLISECONDS_IN_DAY) {
    formatString = 'DD[D] HH[H] mm[M]';
  } else if (duration >= MILLISECONDS_IN_HOUR) {
    formatString = 'HH[H] mm[M]';
  } else {
    formatString = 'mm[M]';
  }
  duration = duration + new Date(duration).getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return dayjs(duration).subtract(DURATION_DAY, 'day').format(formatString);
};

export {
  getRandomInteger,
  formatToFullDateAndTime,
  formatToMonthAndDay,
  formatToFullDate,
  formatToHoursAndMin,
  generateType,
  generateOffersByType,
  getDuration,
};
