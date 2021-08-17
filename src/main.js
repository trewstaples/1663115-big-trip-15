import { createTemplateFromItemsArray } from './utils.js';
import { createTripInfoTemplate } from './view/trip-info.js';
import { createSiteMenuTemplate } from './view/site-menu.js';
import { createFiltersFormTemplate } from './view/trip-filters.js';
import { createSortFormTemplate } from './view/trip-sort.js';
import { createPointsListTemplate, createPointsList } from './view/points-list.js';
import { createTripPointTemplate } from './view/points-view.js';
import { createEditEventFormTemplate } from './view/event-edit.js';

const POINTS_COUNT = 20;

const points = createPointsList(POINTS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

tripEvents.classList.toggle('visually-hidden', !points.length);

render(tripMain, createTripInfoTemplate(points), 'afterbegin');
render(tripNavigation, createSiteMenuTemplate(), 'beforeend');
render(tripFilters, createFiltersFormTemplate(), 'beforeend');
render(tripEvents, createSortFormTemplate(), 'beforeend');
render(tripEvents, createPointsListTemplate(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');

const renderPointsList = (first, ...rest) => {
  render(tripEventsList, createEditEventFormTemplate(first), 'beforeend');
  render(tripEventsList, createTemplateFromItemsArray(rest, createTripPointTemplate), 'beforeend');
};

renderPointsList(...points);
