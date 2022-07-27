import moment from 'moment';

export const getFormattedDate = (seconds) => moment.utc(seconds).format('DD/MM/YYYY');
export const getFormattedTime = (seconds) => moment.utc(seconds).format('HH:mmA');
export const getFormattedDateAndTime = (seconds) => moment.utc(seconds).format('DD/MM/YYYY HH:mmA');
