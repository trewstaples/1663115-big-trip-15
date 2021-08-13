import { createTripInfoTemplate } from './view/trip-info.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFiltersTemplate } from './view/filters.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createTripPointTemplate } from './view/points-view.js';
import { createEventEditTemplate } from './view/event-edit.js';
import { generatePoint } from './mock/points-mock.js';

const POINT_COUNT = 3;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const pageHeader = document.querySelector('.page-header');
const tripMain = pageHeader.querySelector('.trip-main');

render(tripMain, createTripInfoTemplate(), 'afterbegin');

const tripNavigation = pageHeader.querySelector('.trip-controls__navigation');
render(tripNavigation, createSiteMenuTemplate(), 'beforeend');

const tripFilters = pageHeader.querySelector('.trip-controls__filters');
render(tripFilters, createFiltersTemplate(), 'afterbegin');

const pageBody = document.querySelector('.page-body__page-main');
const tripEvents = pageBody.querySelector('.trip-events');
render(tripEvents, createTripSortTemplate(), 'beforeend');

for (let i = 1; i < POINT_COUNT; i++) {
  render(tripEvents, createTripPointTemplate(points[i]), 'beforeend');
}

const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEventEditTemplate(points[0]), 'afterbegin');
