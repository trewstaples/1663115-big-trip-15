import { createTemplateFromItemsArray, createElement } from '../utils.js';

const FilterConditions = {
  everything: {
    value: 'everything',
    isChecked: true,
  },
  future: {
    value: 'future',
    isChecked: false,
  },
  past: {
    value: 'past',
    isChecked: false,
  },
};

const createFilterTemplate = (filterName) => {
  const { value, isChecked } = FilterConditions[filterName];

  return `<div class="trip-filters__filter">
             <input
                id="filter-everything"
                class="trip-filters__filter-input visually-hidden"
                type="radio"
                name="trip-filter"
                value="${value}"
                ${isChecked ? 'checked' : ''}
             >
             <label class="trip-filters__filter-label" for="filter-everything">${value}</label>
          </div>`;
};

const getFiltersTemplate = (filtersObject) => {
  const filterNames = Object.keys(filtersObject);
  return createTemplateFromItemsArray(filterNames, createFilterTemplate);
};

const createFiltersFormTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
      ${getFiltersTemplate(FilterConditions)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;

class TripFilters {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFiltersFormTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripFilters;
