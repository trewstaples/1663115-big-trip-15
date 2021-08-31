import dayjs from 'dayjs';
import { generateEventType } from '../utils/point.js';
import { generatePoint } from '../mock/points.js';
import AbstractView from './abstract.js';

const createTripEventsListTemplate = () => `<ul class="trip-events__list">
   </ul>`;
const createPointsList = (pointsCount) => {
  const points = new Array(pointsCount).fill(null).map(() => generatePoint(generateEventType()));
  return points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
};

class TripEventsList extends AbstractView {
  getTemplate() {
    return createTripEventsListTemplate();
  }
}

export { createPointsList };
export default TripEventsList;
