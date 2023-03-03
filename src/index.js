import path from 'path';
import compareObjects from './compareObjects.js';
import { parse, readFile } from './parsers.js';
import chooseFormatter from './formatters/index.js';

export default (filepath1, filepath2, formatName = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const fileExtension1 = path.extname(filepath1);
  const fileExtension2 = path.extname(filepath2);
  const obj1 = parse(fileContent1, fileExtension1);
  const obj2 = parse(fileContent2, fileExtension2);
  const sortedObjectsArray = compareObjects(obj1, obj2);
  return chooseFormatter(formatName, sortedObjectsArray);
};
