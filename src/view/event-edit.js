import { POINT_TYPES, CITIES } from '../consts.js';
import { createTemplateFromItemsArray, formatToEditEventFormDatetime, generateOffersListByType, createElement } from '../utils.js';

const destinationClassName = ({ description, pictures } = {}) => (!description && pictures && !pictures.length ? 'visually-hidden' : '');
const getCheckedOfferTitles = (offers) => offers.map((offer) => offer.title);
const checkedAttribute = (isChecked) => (isChecked ? 'checked' : '');
const picturesClassName = ({ pictures = [] } = {}) => (!pictures.length ? 'visually-hidden' : '');
const offersListCLassName = (offers) => (!offers.length ? 'visually-hidden' : '');

const detailsSectionClassName = (offers, destination) => {
  if (destination) {
    return !offers.length && !destination.description && !destination.pictures.length ? 'visually-hidden' : '';
  }
};

const createEventTypeTemplate = (type) =>
  `<div class="event__type-item">
     <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
     <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
   </div>`;

const createIconType = (type) => (type ? `src="img/icons/${type}.png"` : '');

const createDestinationOptionTemplate = (destination) => `<option value="${destination}"></option>`;

const createDestinationName = (destination) => (destination ? destination.name : '');

const createDestinationDescription = (destination) => (destination ? destination.description : '');

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

const createEditEventFormTemplate = (point = []) => {
  const { basePrice, dateFrom, dateTo, destination, offers = [], type } = point;

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
              </header>
              <section class="event__details ${detailsSectionClassName(offers, destination)}">
                <section class="event__section  event__section--offers ${offersListCLassName(generateOffersListByType(type))}">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                  <div class="event__available-offers">
                    ${makeOfferTogglesTemplate(generateOffersListByType(type), getCheckedOfferTitles(offers))}
                  </div>
                </section>
                <section class="event__section  event__section--destination ${destinationClassName(destination)}">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${createDestinationDescription(destination)}</p>
                  <div class="event__photos-container ${picturesClassName(destination)}">
                    <div class="event__photos-tape">
                      ${createPicturesTemplate(destination)}
                    </div>
                  </div>
                </section>
              </section>
            </form>
          </li>`;
};

class TripEventEdit {
  constructor(point) {
    this._edits = point;
    this._element = null;
  }

  getTemplate() {
    return createEditEventFormTemplate(this._edits);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripEventEdit;
// export { createEditEventFormTemplate };
