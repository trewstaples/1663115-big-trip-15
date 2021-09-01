import NoPointView from '../view/no-point.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/points-list.js';
import { render, RenderPosition } from '../utils/render.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../consts.js';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/point.js';

class Trip {
  constructor(tripEventsContainer) {
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._noPointComponent = new NoPointView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();

    render(this._tripEventsContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this._points.sort(sortPointPrice);
        break;
      case SortType.TIME:
        this._points.sort(sortPointTime);
        break;
      default:
        this._points.sort(sortPointDay);
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPointList();
  }

  _renderSort() {
    render(this._tripEventsContainer, this._tripSortComponent, RenderPosition.AFTERBEGIN);
    this._tripSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(container, point) {
    const pointPresenter = new PointPresenter(container, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPointList() {
    for (let i = 0; i < this._points.length; i++) {
      this._renderPoint(this._tripEventsListComponent, this._points[i]);
    }
  }

  _renderNoPoint() {
    render(this._tripEventsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
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
