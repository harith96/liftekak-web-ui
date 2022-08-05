import _ from 'lodash';

const getFormattedRoute = (route) => _.join(route, ' > ');

export default getFormattedRoute;
