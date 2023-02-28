import path from 'path';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

export default (filepath) => {
  const format = path.extname(filepath);
  const absolutePath = path.resolve(process.cwd(), '__fixtures__', filepath);
  const fileContent = readFileSync(absolutePath, 'utf-8');
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.load;
  }

  return parse(fileContent);
};
