import * as _ from 'lodash';

const getFullName = (firstName, lastName) => {
  let fullName = '';

  if (!_.isEmpty(firstName)) fullName += _.chain(firstName).trim().startCase().value();
  if (!_.isEmpty(lastName)) fullName += ` ${_.chain(lastName).trim().startCase().value()}`;

  return fullName;
};

export default getFullName;
