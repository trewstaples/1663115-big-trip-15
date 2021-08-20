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

const POINTS_COUNT = 20;

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
    const pointListComponent = new TripPointsView(point);
    const pointEditComponent = new TripEventEditView(point);

    const replaceCardToForm = () => {
      tripEventsList.replaceChild(pointEditComponent.getElement(), pointListComponent.getElement());
    };

    const replaceFormToCard = () => {
      tripEventsList.replaceChild(pointListComponent.getElement(), pointEditComponent.getElement());
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointListComponent
      .getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replaceCardToForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent
      .getElement()
      .querySelector('form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent
      .getElement()
      .querySelector('.event__reset-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent
      .getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      });

    render(container, pointListComponent.getElement(), RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < points.length; i++) {
    renderPoints(tripEventsList, points[i]);
  }
}
