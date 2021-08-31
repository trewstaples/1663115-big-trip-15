import TripEventEditView from '../view/event-edit.js';
import TripPointsView from '../view/points-view.js';
import { render, RenderPosition, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class Point {
  constructor(tripEventsListContainer, changeData, changeMode) {
    this._tripEventsListContainer = tripEventsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointListComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEventReset = this._handleEventReset.bind(this);
    this._handleEventRollUp = this._handleEventRollUp.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointListComponent = this._pointListComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointListComponent = new TripPointsView(point);
    this._pointEditComponent = new TripEventEditView(point);

    this._pointListComponent.setEditClickHandler(this._handleEditClick);
    this._pointListComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setEventResetHandler(this._handleEventReset);
    this._pointEditComponent.setEventRollUpHandler(this._handleEventRollUp);

    if (prevPointListComponent === null || prevPointEditComponent === null) {
      render(this._tripEventsListContainer, this._pointListComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointListComponent, prevPointListComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointListComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this._pointListComponent);
    remove(this._pointEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  _replaceCardToForm() {
    replace(this._pointEditComponent, this._pointListComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._pointListComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
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

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({}, this._task, {
        isFavorite: !this._task.isFavorite,
      }),
    );
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
