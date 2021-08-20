import { generateEventType, createElement } from '../utils.js';
import { generatePoint } from '../mock/points.js';
import dayjs from 'dayjs';

const createPointsListTemplate = () => `<ul class="trip-events__list">
   </ul>`;
const createPointsList = (pointsCount) => {
  const points = new Array(pointsCount).fill(null).map((event, index) => generatePoint(generateEventType(), index));
  return points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
};

class TripPointsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPointsListTemplate();
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
export { createPointsList };
export default TripPointsList;
