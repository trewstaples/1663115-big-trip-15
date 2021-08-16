import { generateEventType } from '../utils.js';
import { generatePoint } from '../mock/points-mock.js';
import dayjs from 'dayjs';

const createPointsListTemplate = () => `<ul class="trip-events__list">
   </ul>`;
const createPointsList = (pointsCount) => {
  const points = new Array(pointsCount).fill(null).map((event, index) => generatePoint(generateEventType(), index));
  return points.sort((a, b) => dayjs(a.dateFrom) - dayjs(b.dateFrom));
};

export { createPointsListTemplate, createPointsList };
