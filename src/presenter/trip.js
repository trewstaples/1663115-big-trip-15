import NoPointView from '../view/no-point.js';
import TripSortView from '../view/trip-sort.js';
import TripEventsListView from '../view/points-list.js';
import { render, RenderPosition } from '../utils/render.js';
import PointPresenter from './point.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../consts.js';
import { sortPointDay, sortPointPrice, sortPointTime } from '../utils/point.js';

class Trip {
  constructor(tripEventsContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripEventsContainer = tripEventsContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DAY;

    this._sortComponent = null;

    this._noPointComponent = new NoPointView();
    this._tripSortComponent = new TripSortView();
    this._tripEventsListComponent = new TripEventsListView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    render(this._tripEventsContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);

    this._renderTripEvents();
  }

  _getPoints() {
    const points = this._pointsModel.getPoints();

    switch (this._currentSortType) {
      case SortType.PRICE:
        return points.sort(sortPointPrice);
      case SortType.TIME:
        return points.sort(sortPointTime);
    }
    return points.sort(sortPointDay);
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
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

  _renderPointList(points) {
    points.forEach((point) => this._renderPoint(this._tripEventsListComponent, point));
  }

  _renderNoPoint() {
    render(this._tripEventsContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderTripEvents() {
    const points = this._getPoints();
    const pointsCount = points.length;

    if (pointsCount === 0) {
      this._renderNoPoint();
      return;
    }

    this._renderSort();
    this._renderPointList(points);
  }
}

export default Trip;
