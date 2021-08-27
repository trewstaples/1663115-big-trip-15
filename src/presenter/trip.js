import NoPointView from './view/no-point.js';
import TripSortView from './view/trip-sort.js';
import TripEventsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition, replace } from './utils/render.js';

const POINTS_COUNT = 10;

class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;

    this._noPointComponent = new NoPointView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();
  }

  init(points) {
    this._points = points;

    render(this._tripEventsContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderNoPoint() {
    render(this._tripEventsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripEventsContainer, this._tripSortComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(container, point) {
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
  }

  _renderPointList() {
    for (let i = 0; i < this._points.length; i++) {
      this._renderPoint(this._tripEventsListComponent, this._points[i]);
    }
  }

  _renderTripEvents() {
    if (this._points.length === 0) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    this._renderPointList();
  }
}
