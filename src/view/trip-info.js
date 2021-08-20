import { formatToMonthAndDay, createElement } from '../utils.js';

const countTotalBasePrice = (points) => points.reduce((total, point) => total + point.basePrice, 0);

const countTotalOffersPrice = (points) =>
  points.reduce((totalOffersPrice, point) => {
    const { offers = [] } = point;
    return totalOffersPrice + offers.reduce((pointOffersPrice, offer) => pointOffersPrice + offer.price, 0);
  }, 0);

const countTotalTripPrice = (points = []) => countTotalBasePrice(points) + countTotalOffersPrice(points);

const createTripInfoTitle = (points) => {
  switch (points.length) {
    case 1:
      return `${points[0].destination.name}`;
    case 2:
      return `${points[0].destination.name} &mdash; ${points[1].destination.name}`;
    case 3:
      return `${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[2].destination.name}`;
    default:
      return `${points[0].destination.name} &mdash; ... &mdash; ${points[points.length - 1].destination.name}`;
  }
};

const createTripInfoDates = (points) => {
  const tripStartTime = formatToMonthAndDay(points[0].dateFrom);
  const tripEndTime = formatToMonthAndDay(points[points.length - 1].dateTo);
  return `${tripStartTime}&nbsp;&mdash;&nbsp;${tripEndTime}`;
};

const createTripInfoTemplate = (points = []) =>
  !points.length
    ? `<section class="trip-main__trip-info trip-info visually-hidden">
      </section>`
    : `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${createTripInfoTitle(points)}</h1>
    <p class="trip-info__dates">${createTripInfoDates(points)}</p>
  </div>
  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${countTotalTripPrice(points)}</span>
  </p>
</section> `;

class TripInfo {
  constructor(points) {
    this._infos = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._infos);
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

export default TripInfo;
