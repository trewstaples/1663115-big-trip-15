import { createTripInfoTemplate } from './view/trip-info.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFiltersTemplate } from './view/filters.js';
import { createTripSortTemplate } from './view/trip-sort.js';
import { createTripItemsTemplate } from './view/trip-items.js';
import { createEventEditTemplate } from './view/event-edit.js';

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

render(tripEvents, createTripItemsTemplate(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');
render(tripEventsList, createEventEditTemplate(), 'afterbegin');
