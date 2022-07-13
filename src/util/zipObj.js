const { gzip } = require('pako');

const zipObj = (obj) => gzip(JSON.stringify(obj));

export default zipObj;
