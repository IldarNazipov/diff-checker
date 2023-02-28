import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const combinedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const arrayToSort = combinedKeys.reduce((acc, key) => {
    if (!(key in obj1)) {
      acc.push({
        operator: '+', filename: filepath2, key, value: obj2[key],
      });
    } else if (!(key in obj2)) {
      acc.push({
        operator: '-', filename: filepath2, key, value: obj1[key],
      });
    } else if (obj1[key] !== obj2[key]) {
      acc.push({
        operator: '-', filename: filepath1, key, value: obj1[key],
      });
      acc.push({
        operator: '+', filename: filepath2, key, value: obj2[key],
      });
    } else {
      acc.push({
        operator: ' ', filename: filepath1, key, value: obj1[key],
      });
    }
    return acc;
  }, []);
  const sortedDiff = _.sortBy(arrayToSort, ['key', 'filename']);
  const resultString = sortedDiff.map(({ operator, key, value }) => `  ${operator} ${key}: ${value}`);
  return `{\n${resultString.join('\n')}\n}`;
};
export default genDiff;
