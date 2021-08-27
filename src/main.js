import TripInfoView from './view/trip-info.js';
import SiteMenuView from './view/site-menu.js';
import TripFiltersView from './view/trip-filters.js';
import { createPointsList } from './view/points-list.js';
import { render, RenderPosition } from './utils/render.js';
import TripPresenter from './presenter/trip.js';

const POINTS_COUNT = 10;

const points = createPointsList(POINTS_COUNT);

const tripMain = document.querySelector('.trip-main');
const tripNavigation = tripMain.querySelector('.trip-controls__navigation');
const tripFilters = tripMain.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tripInfoComponent = new TripInfoView(points);
const siteMenuComponent = new SiteMenuView();
const tripFiltersComponent = new TripFiltersView();

render(tripMain, tripInfoComponent, RenderPosition.AFTERBEGIN);
render(tripNavigation, siteMenuComponent, RenderPosition.BEFOREEND);
render(tripFilters, tripFiltersComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEvents);
tripPresenter.init(points);
