import _ from 'lodash';

export const buildRouteIndexString = (pair) => `${_.snakeCase(pair[0])}_${_.snakeCase(pair[1])}`;

const buildRouteIndex = (arr) =>
  arr
    .map((v, i) => arr.slice(i + 1).map((w) => [v, w]))
    .flat()
    .map(buildRouteIndexString);

export default buildRouteIndex;
