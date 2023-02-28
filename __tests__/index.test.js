import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toBe('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
});

test('parse', () => {
  expect(parse(getFixturePath('file1.yml'))).toEqual({ host: 'hexlet.io', timeout: 50, proxy: '123.234.53.22', follow: false });
  expect(parse(getFixturePath('file2.yml'))).toEqual({ timeout: 20, verbose: true, host: 'hexlet.io' });
});
