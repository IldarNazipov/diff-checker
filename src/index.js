import path from 'path';
import { readFileSync } from 'fs';
import compareObjects from './compareObjects.js';
import parse from './parsers.js';
import chooseFormatter from './formatters/index.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const defineFileFormat = (filepath) => {
  const fileExtension = path.extname(filepath);
  if (fileExtension === '.json') {
    return 'JSON';
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return 'YAML';
  }
  throw new Error('not supported file format');
};

export default (filepath1, filepath2, outputFormatName = 'stylish') => {
  const fileContent1 = readFile(filepath1);
  const fileContent2 = readFile(filepath2);
  const fileFormat1 = defineFileFormat(filepath1);
  const fileFormat2 = defineFileFormat(filepath2);
  const obj1 = parse(fileContent1, fileFormat1);
  const obj2 = parse(fileContent2, fileFormat2);
  const sortedObjectsArray = compareObjects(obj1, obj2);
  return chooseFormatter(outputFormatName, sortedObjectsArray);
};
