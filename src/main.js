import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition } from './utils.js/render.js';
import NoPointView from './view/no-point.js';

const POINTS_COUNT = 10;

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
    const pointList = pointListComponent.getElement();
    const pointEdit = pointEditComponent.getElement();

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

    render(container, pointList, RenderPosition.BEFOREEND);
  };

  for (let i = 0; i < points.length; i++) {
    renderPoints(tripEventsList, points[i]);
  }
}
