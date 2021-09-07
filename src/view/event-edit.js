import { POINT_TYPES, CITIES, DESCRIPTIONS, OffersPriceList } from '../consts.js';
import { createTemplateFromItemsArray, formatToEditEventFormDatetime, generateOffersListByType } from '../utils/point.js';
import SmartView from './smart.js';
import { getRandomInteger, generateDestinationValue, generatePictures, MIN_PICTURES_VALUE, MAX_PICTURES_VALUE } from '../mock/points.js';

const getCheckedOfferTitles = (offers) => offers.map((offer) => offer.title);
const checkedAttribute = (isChecked) => (isChecked ? 'checked' : '');

const createEventTypeTemplate = (type) =>
  `<div class="event__type-item">
     <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
   </div>`;

const createIconType = (type) => (type ? `src="img/icons/${type}.png"` : '');

const createDestinationOptionTemplate = (destination) => `<option value="${destination}"></option>`;

const createDestinationName = (destination) => (destination ? destination.name : '');

const createPictureTemplate = ({ src, description }) => `<img class="event__photo" src="${src}" alt="${description}">`;

const createPicturesTemplate = (destination) => {
  if (destination) {
    const { pictures } = destination;
    return createTemplateFromItemsArray(pictures, createPictureTemplate);
  }
};

const createOfferToggleTemplate = (offer, index, isChecked) =>
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${index}" type="checkbox" name="event-offer-comfort" ${checkedAttribute(isChecked)}>
      <label class="event__offer-label" for="event-offer-comfort-${index}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
   </div>`;

const makeOfferTogglesTemplate = (availableOffers, checkedOffers = []) => {
  if (checkedOffers.length) {
    return availableOffers.map((offer, i) => createOfferToggleTemplate(offer, i, checkedOffers.includes(offer.title))).join('');
  }
  return availableOffers.map((offer, i) => createOfferToggleTemplate(offer, i, false)).join('');
};

const createEditEventFormTemplate = (data) => {
  const { basePrice, dateFrom, dateTo, destination, offers = [], type, isOffers, isDescription, isPictures } = data;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" ${createIconType(type)} alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${createTemplateFromItemsArray(POINT_TYPES, createEventTypeTemplate)}
                    </fieldset>
                  </div>
                </div>
                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${createDestinationName(destination)}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    ${createTemplateFromItemsArray(CITIES, createDestinationOptionTemplate)}
                  </datalist>
                </div>
                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatToEditEventFormDatetime(dateFrom)}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatToEditEventFormDatetime(dateTo)}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                </div>
                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Cancel</button>
                <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </header>
              <section class="event__details ${isOffers || isDescription || isPictures ? '' : 'visually-hidden'}">
                <section class="event__section  event__section--offers ${isOffers ? '' : 'visually-hidden'}">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${makeOfferTogglesTemplate(generateOffersListByType(type), getCheckedOfferTitles(offers))}
                  </div>
                </section>
                <section class="event__section  event__section--destination ${isPictures || isDescription ? '' : 'visually-hidden'}">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${isDescription ? destination.description : ''}</p>
                  <div class="event__photos-container ${isPictures ? '' : 'visually-hidden'}">
                    <div class="event__photos-tape">
                      ${createPicturesTemplate(destination)}
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </li>`;
};

class TripEventEdit extends SmartView {
  constructor(point) {
    super();
    this._data = TripEventEdit.parsePointToData(point);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventResetHandler = this._eventResetHandler.bind(this);
    this._eventRollUpHandler = this._eventRollUpHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._eventDestinationChangeHandler = this._eventDestinationChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(point) {
    this.updateData(TripEventEdit.parsePointToData(point));
  }

  getTemplate() {
    return createEditEventFormTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEventResetHandler(this._callback.eventReset);
    this.setEventRollUpHandler(this._callback.eventRollUp);
  }

  _setInnerHandlers() {
    this.getElement().querySelector('.event__type-group').addEventListener('change', this._eventTypeChangeHandler);
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._eventDestinationChangeHandler);
  }

  _eventTypeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value,
      offers: [],
      isOffers: evt.target.value in OffersPriceList,
    });
  }

  _eventDestinationChangeHandler(evt) {
    const description = generateDestinationValue(DESCRIPTIONS);
    const pictures = generatePictures(getRandomInteger(MIN_PICTURES_VALUE, MAX_PICTURES_VALUE));

    this.updateData({
      destination: {
        name: evt.target.value,
        description,
        pictures,
      },
      isDescription: description !== null,
      isPictures: pictures.length !== null,
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(TripEventEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _eventResetHandler(evt) {
    evt.preventDefault();
    this._callback.eventReset();
  }

  setEventResetHandler(callback) {
    this._callback.eventReset = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._eventResetHandler);
  }

  _eventRollUpHandler(evt) {
    evt.preventDefault();
    this._callback.eventRollUp();
  }

  setEventRollUpHandler(callback) {
    this._callback.eventRollUp = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._eventRollUpHandler);
  }

  static parsePointToData(point) {
    return Object.assign({}, point, {
      isOffers: point.type in OffersPriceList,
      isDescription: point.destination.description !== null,
      isPictures: point.destination.pictures.length !== null,
    });
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);
    delete data.isOffers;
    delete data.isDescription;
    delete data.isPictures;

    return data;
  }
}

export default TripEventEdit;
