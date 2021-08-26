import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import TripSortView from './view/trip-sort.js';
import TripPointsListView from './view/points-list.js';
import { createPointsList } from './view/points-list.js';
import TripEventEditView from './view/event-edit.js';
import TripPointsView from './view/points-view.js';
import { render, RenderPosition, replace } from './utils/render.js';
import NoPointView from './view/no-point.js';

class Trip {
  constructor(tripContainer) {
    this._tripListContainer = tripListContainer;

    this._tripInfoComponent = new TripInfoView(points);
    this._siteMenuComponent = new SiteMenuView();
    this._tripFiltersComponent = new TripFiltersView();
    this._noPointComponent = new NoPointView();
    this._tripSortComponent = new TripSortView();
    this._tripPointsListComponent = new TripPointsListView();
  }

  init(tripPoints) {
    this._tripPoints = tripPoints;
  }

  _renderTripInfo() {}

  _renderSiteMenu() {}

  _renderFilters() {}

  _renderNoPoint() {}

  _renderSort() {}

  _renderPoint() {}

  _renderPointList() {}

  _renderTripSection() {}
}
