import dayjs from 'dayjs';
import { POINT_TYPES, OffersPriceList } from './consts.js';

const MILLISECONDS_IN_DAY = 86400000;
const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const DURATION_DAY = 1;

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
const formatToEditEventFormDatetime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const generateEventType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generateOffersListByType = (eventType) => {
  if (eventType in OffersPriceList) {
    return Object.entries(OffersPriceList[eventType]).map((offer) => ({
      title: offer[0],
      price: offer[1],
    }));
  }
  return [];
};

const generateRandomList = (min = 0, max = 1, length) => {
  const list = [];

  while (list.length !== length) {
    const number = getRandomInteger(min, max);
    if (!list.includes(number)) {
      list.push(number);
    }
  }
  return list;
};

const generateRandomOffersList = (type) => {
  const offers = generateOffersListByType(type);
  if (!offers.length) {
    return;
  }

  const randomOffersList = generateRandomList(0, offers.length - 1, getRandomInteger(0, offers.length - 1));
  if (randomOffersList.length) {
    return randomOffersList.map((integer) => offers[integer]);
  }
};

const createTemplateFromItemsArray = (items = [], cb) => items.map((item) => cb(item)).join('');

const getDuration = (from, to) => {
  let duration = dayjs(to).diff(dayjs(from), 'millisecond');

  let formatString = 'mm[M]';

  if (duration >= MILLISECONDS_IN_DAY) {
    formatString = 'DD[D] HH[H] mm[M]';
  } else if (duration >= MILLISECONDS_IN_HOUR) {
    formatString = 'HH[H] mm[M]';
  }
  duration = duration + new Date(duration).getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return dayjs(duration).subtract(DURATION_DAY, 'day').format(formatString);
};

const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export { getRandomInteger, formatToFullDateAndTime, formatToMonthAndDay, formatToFullDate, formatToHoursAndMin, generateEventType, formatToEditEventFormDatetime, generateOffersListByType, createTemplateFromItemsArray, generateRandomOffersList, getDuration, RenderPosition, render, createElement };
