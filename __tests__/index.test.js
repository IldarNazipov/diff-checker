import { expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import { stylishResult, plainResult, jsonResult } from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(stylishResult);
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(stylishResult);
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(plainResult);
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plainn')).toThrow();
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(jsonResult);
});
