import dayjs from 'dayjs';
import { generateEventType } from '../utils.js/point.js';
import { generatePoint } from '../mock/points.js';
import AbstractView from './abstract.js';

const createPointsListTemplate = () => `<ul class="trip-events__list">
   </ul>`;
const createPointsList = (pointsCount) => {
  const points = new Array(pointsCount).fill(null).map((event, index) => generatePoint(generateEventType(), index));
  return points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
};

class TripPointsList extends AbstractView {
  getTemplate() {
    return createPointsListTemplate();
  }
}

export { createPointsList };
export default TripPointsList;
