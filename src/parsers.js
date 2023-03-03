import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (file, extension) => {
  if (extension === '.json') {
    return JSON.parse(file);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(file);
  }
  throw new Error('not supported format');
};

export { parse, readFile };
