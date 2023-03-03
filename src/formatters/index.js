import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJSON from './json.js';

export default (format, diff) => {
  if (format === 'stylish') {
    return makeStylish(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  if (format === 'json') {
    return makeJSON(diff);
  }
  throw new Error(`unknown format '${format}', only 'stylish', 'plain' and 'json' options are available.`);
};
