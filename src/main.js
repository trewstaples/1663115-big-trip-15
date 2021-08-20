import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition } from './utils.js';

const POINTS_COUNT = 20;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

tripEvents.classList.toggle('visually-hidden', !points.length);

render(tripMain, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(tripNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
render(tripEvents, new TripPointsListView().getElement(), RenderPosition.BEFOREEND);

const tripEventsList = tripEvents.querySelector('.trip-events__list');

// render(tripEventsList, new TripEventEditView(points[0]).getElement(), RenderPosition.BEFOREEND);

const renderPoints = (container, point) => {
  const pointListComponent = new TripPointsView(point);
  const pointEditComponent = new TripEventEditView(point);

  render(container, pointListComponent.getElement(), RenderPosition.BEFOREEND);
};

for (let i = 0; i < points.length; i++) {
  renderPoints(tripEventsList, points[i]);
}
