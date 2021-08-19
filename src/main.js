import { createTripInfoTemplate } from './view/trip-info.js';
import { SiteMenuView } from './view/site-menu.js';
import { createFiltersFormTemplate } from './view/trip-filters.js';
import { createSortFormTemplate } from './view/trip-sort.js';
import { createPointsListTemplate, createPointsList } from './view/points-list.js';
import { createTripPointTemplate } from './view/points-view.js';
import { createEditEventFormTemplate } from './view/event-edit.js';
import { createTemplateFromItemsArray, renderTemplate, renderElement, RenderPosition } from './utils.js';

const POINTS_COUNT = 20;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

tripEvents.classList.toggle('visually-hidden', !points.length);

renderTemplate(tripMain, createTripInfoTemplate(points), 'afterbegin');
renderElement(tripNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderTemplate(tripFilters, createFiltersFormTemplate(), 'beforeend');
renderTemplate(tripEvents, createSortFormTemplate(), 'beforeend');
renderTemplate(tripEvents, createPointsListTemplate(), 'beforeend');

const tripEventsList = tripEvents.querySelector('.trip-events__list');

const renderPointsList = (first, ...rest) => {
  renderTemplate(tripEventsList, createEditEventFormTemplate(first), 'beforeend');
  renderTemplate(tripEventsList, createTemplateFromItemsArray(rest, createTripPointTemplate), 'beforeend');
};

renderPointsList(...points);
