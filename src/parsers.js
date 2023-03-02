import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (file, extension) => {
  let parseMethod;
  if (extension === '.json') {
    parseMethod = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parseMethod = yaml.load;
  }
  return parseMethod(file);
};

export { parse, readFile };
