import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripEventsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition, replace } from './utils/render.js';
import NoPointView from './view/no-point.js';

const POINTS_COUNT = 10;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView(points);
const siteMenuComponent = new SiteMenuView();
const tripFiltersComponent = new TripFiltersView();
const noPointComponent = new NoPointView();
const tripSortComponent = new TripSortView();
const tripEventsListComponent = new TripEventsListView();

render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
render(tripFilters, tripFiltersComponent, RenderPosition.BEFOREEND);

if (points.length === 0) {
  render(tripEvents, noPointComponent, RenderPosition.BEFOREEND);
} else {
  render(tripEvents, tripSortComponent, RenderPosition.BEFOREEND);
  render(tripEvents, tripEventsListComponent, RenderPosition.BEFOREEND);

  const tripEventsList = tripEvents.querySelector('.trip-events__list');

  const renderPoints = (container, point) => {
    const pointListComponent = new TripPointsView(point);
    const pointEditComponent = new TripEventEditView(point);

    const replaceCardToForm = () => {
      replace(pointEditComponent, pointListComponent);
    };

    const replaceFormToCard = () => {
      replace(pointListComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointListComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEventResetHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setEventRollUpHandler(() => {
      replaceFormToCard();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(container, pointListComponent, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < points.length; i++) {
    renderPoints(tripEventsList, points[i]);
  }
}
