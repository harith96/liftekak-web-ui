import en from './en.json';

const t = (key) => en[key] || key;

// eslint-disable-next-line import/prefer-default-export
export { t };
