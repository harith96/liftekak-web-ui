import _ from 'lodash';

export const simulateCall = (phoneNumber) => window.open(`tel:${phoneNumber}`, '_self');
export const getFullPhoneNumber = (countryCode, phoneNumber) => {
  let formattedNumber = countryCode || '';

  if (!_.isEmpty(phoneNumber)) {
    if (phoneNumber[0] === '0') formattedNumber += phoneNumber[(1, phoneNumber.length)];
    else formattedNumber += phoneNumber;
  }

  return formattedNumber;
};
