import _ from 'lodash';

const { Gender } = require('enums');

const buildPassengerPreferenceDB = (preferences) =>
  _.chain(Gender)
    .keys()
    .reduce((result, gender) => {
      _.set(result, gender, _.includes(preferences, gender));
      return result;
    }, {})
    .value();

export default buildPassengerPreferenceDB;
