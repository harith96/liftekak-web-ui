import * as _ from 'lodash';

const getFullName = (firstName, lastName) => {
  let fullName = '';

  if (!_.isEmpty(firstName)) fullName += _.trim(firstName);
  if (!_.isEmpty(lastName)) fullName += ` ${_.trim(lastName)}`;

  return fullName;
};

export default getFullName;
