import moment from 'moment';

export const getFormattedDate = (seconds) => moment.utc(seconds * 1000).format('DD/MM/YYYY');
export const getFormattedTime = (seconds) => moment.utc(seconds * 1000).format('HH:mmA');
export const getFormattedDateAndTime = (seconds) => moment.utc(seconds * 1000).format('DD/MM/YYYY HH:mmA');
