import TripEventEditView from '../view/event-edit.js';
import TripPointsView from '../view/points-view.js';
import { render, RenderPosition, replace } from '../utils/render.js';

class Point {
  constructor(tripEventsListContainer) {
    this._tripEventsListContainer = tripEventsListContainer;

    this._pointListComponent = null;
    this._pointEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEventReset = this._handleEventReset.bind(this);
    this._handleEventRollUp = this._handleEventRollUp.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointListComponent = new TripPointsView(point);
    this._pointEditComponent = new TripEventEditView(point);

    this._pointListComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEventResetHandler(this._handleEventReset);
    this._pointEditComponent.setEventRollUpHandler(this._handleEventRollUp);

    render(this._tripEventsListContainer, this._pointListComponent, RenderPosition.BEFOREEND);
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointListComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToCard() {
    replace(this._pointListComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToCard();
    }
  }

  _handleEditClick() {
    this._replaceCardToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToCard();
  }

  _handleEventReset() {
    this._replaceFormToCard();
  }

  _handleEventRollUp() {
    this._replaceFormToCard();
  }
}

export default Point;
