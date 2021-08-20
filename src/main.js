import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { renderElement, RenderPosition } from './utils.js';

const POINTS_COUNT = 20;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

tripEvents.classList.toggle('visually-hidden', !points.length);

renderElement(tripMain, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
renderElement(tripNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEvents, new TripPointsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEvents.querySelector('.trip-events__list');

renderElement(tripEventsList, new TripEventEditView(points[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < Math.min(points.length, POINTS_COUNT); i++) {
  renderElement(tripEventsList, new TripPointsView(points[i]).getElement(), RenderPosition.BEFOREEND);
}
