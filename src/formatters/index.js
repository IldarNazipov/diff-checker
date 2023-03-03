import makeStylish from './stylish.js';
import makePlain from './plain.js';

const chooseFormatter = (format, diff) => {
  if (format === 'stylish') {
    return makeStylish(diff);
  }
  if (format === 'plain') {
    return makePlain(diff);
  }
  throw new Error(`unknown format '${format}', please try 'stylish' or 'plain'`);
};

export default chooseFormatter;
