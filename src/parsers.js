import yaml from 'js-yaml';
import path from 'path';
import { readFileSync } from 'fs';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return readFileSync(absolutePath, 'utf-8');
};

const parse = (string, format) => {
  if (format === '.json') {
    return JSON.parse(string);
  }
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(string);
  }
  throw new Error('not supported format');
};

export { parse, readFile };
