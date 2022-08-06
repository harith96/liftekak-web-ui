import _ from 'lodash';

const getFirstAndLastNamesFromFullName = (fullName) => {
  const names = _.split(fullName, ' ');

  if (names.length < 2) return {};

  return { firstName: names[0], lastName: names[1] };
};

export default getFirstAndLastNamesFromFullName;
