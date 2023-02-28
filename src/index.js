import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const getObjectFromFile = (filePath) => {
    const absolutePath = path.resolve(process.cwd(), '__fixtures__', filePath);
    const fileContent = readFileSync(absolutePath, 'utf-8');
    return JSON.parse(fileContent);
  };

  const obj1 = getObjectFromFile(filepath1);
  const obj2 = getObjectFromFile(filepath2);
  const combinedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const diffArray = combinedKeys.reduce((acc, key) => {
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

  const sortedDiff = _.sortBy(diffArray, ['key', 'filename']);
  const resultString = sortedDiff.map(({ operator, key, value }) => `  ${operator} ${key}: ${value}`);

  return `{\n${resultString.join('\n')}\n}`;
};

export default genDiff;
