import { createTemplateFromItemsArray } from '../utils.js';
import AbstractView from './abstract.js';

const SortConditions = {
  day: {
    value: 'day',
    isChecked: true,
    isDisabled: false,
  },
  event: {
    value: 'event',
    isChecked: false,
    isDisabled: true,
  },
  time: {
    value: 'time',
    isChecked: false,
    isDisabled: true,
  },
  price: {
    value: 'price',
    isChecked: false,
    isDisabled: false,
  },
  offers: {
    value: 'offers',
    isChecked: false,
    isDisabled: false,
  },
};

const createSortItemTemplate = (condition) => {
  const { value, isChecked, isDisabled } = SortConditions[condition];

  return `<div class="trip-sort__item trip-sort__item--${value}">
            <input
              id="sort-${value}"
              class="trip-sort__input visually-hidden"
              type="radio"
              name="trip-sort"
              value="sort-${value}"
              ${isChecked ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
            >
            <label class="trip-sort__btn" for="sort-${value}">${value}</label>
         </div>`;
};

const createSortConditionsTemplate = (sortObject) => {
  const parameters = Object.keys(sortObject);
  return createTemplateFromItemsArray(parameters, createSortItemTemplate);
};

const createSortFormTemplate = () =>
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${createSortConditionsTemplate(SortConditions)}
   </form>`;

class TripSort extends AbstractView {
  getTemplate() {
    return createSortFormTemplate();
  }
}

export default TripSort;
