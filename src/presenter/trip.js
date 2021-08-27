import NoPointView from '../view/no-point.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/points-list.js';
import { render, RenderPosition } from '../utils/render.js';
import PointPresenter from './point.js';

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
    render(this._tripEventsContainer, this._tripSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(container, point) {
    const pointPresenter = new PointPresenter(container);
    pointPresenter.init(point);
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

export default Trip;
