import path from 'path';
import makeStylish from './formatters/stylish.js';
import compareObjects from './compareObjects.js';
import { parse, readFile } from './parsers.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const fileExtension1 = path.extname(filepath1);
  const fileExtension2 = path.extname(filepath2);
  const obj1 = parse(fileContent1, fileExtension1);
  const obj2 = parse(fileContent2, fileExtension2);
  const sortedObjectsArray = compareObjects(obj1, obj2);
  if (format === 'stylish') {
    return makeStylish(sortedObjectsArray);
  }
  return 'to be continued...';
};
export default genDiff;
