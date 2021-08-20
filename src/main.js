import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition } from './utils.js';
import NoPointView from './view/no-point.js';

const POINTS_COUNT = 0;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

render(tripMain, new TripInfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(tripNavigation, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(tripFilters, new TripFiltersView().getElement(), RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(tripEvents, new NoPointView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEvents, new TripSortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEvents, new TripPointsListView().getElement(), RenderPosition.BEFOREEND);

  const tripEventsList = tripEvents.querySelector('.trip-events__list');

  const renderPoints = (container, point) => {
    const pointList = new TripPointsView(point).getElement();
    const pointEdit = new TripEventEditView(point).getElement();

    const replaceCardToForm = () => {
      tripEventsList.replaceChild(pointEdit, pointList);
    };

    const replaceFormToCard = () => {
      tripEventsList.replaceChild(pointList, pointEdit);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointList.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEdit.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEdit.querySelector('.event__reset-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEdit.querySelector('.event__rollup-btn').addEventListener('click', (evt) => {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(container, pointList, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < points.length; i++) {
    renderPoints(tripEventsList, points[i]);
  }
}
