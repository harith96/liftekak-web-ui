import * as _ from 'lodash';

const getFullName = (firstName, lastName) => {
  let fullName = '';

  if (!_.isEmpty(firstName)) fullName += firstName;
  if (!_.isEmpty(lastName)) fullName += ` ${lastName}`;

  return fullName;
};

export default getFullName;
