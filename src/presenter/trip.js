import NoPointView from './view/no-point.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
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
    this._tripPointsListComponent = new TripPointsListView();
  }

  init(points) {
    this._points = points;

    render(this._tripEventsContainer, this._tripPointsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _renderNoPoint() {}

  _renderSort() {}

  _renderPoint() {}

  _renderPointList() {}

  _renderTripEvents() {
    if (this._points.length === 0) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    this._renderPointList();
  }
}
