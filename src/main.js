import { createTripInfoTemplate } from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import { createEditEventFormTemplate } from './view/event-edit.js';
import { createTripPointTemplate } from './view/points-view.js';
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
renderElement(tripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripPointsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEvents.querySelector('.trip-events__list');

const renderPointsList = (first, ...rest) => {
  renderTemplate(tripEventsList, createEditEventFormTemplate(first), 'beforeend');
  renderTemplate(tripEventsList, createTemplateFromItemsArray(rest, createTripPointTemplate), 'beforeend');
};

renderPointsList(...points);
