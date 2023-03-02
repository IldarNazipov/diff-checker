/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse, readFile } from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('readfile', () => {
  expect(readFile(getFixturePath('file1.json'))).toEqual(`{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}`);
});

const fileContentYML = readFile(getFixturePath('test2.yml'));
const fileExtensionYML = path.extname(getFixturePath('test2.yml'));
const fileContentYAML = readFile(getFixturePath('test1.yaml'));
const fileExtensionYAML = path.extname(getFixturePath('test1.yaml'));

test('parse', () => {
  expect(parse(fileContentYML, fileExtensionYML)).toEqual({
    common: {
      follow: false,
      setting1: "Value 1",
      setting3: null,
      setting4: "blah blah",
      setting5: {
        key5: "value5"
      },
      setting6: {
        key: "value",
        ops: "vops",
        doge: {
          wow: "so much"
        }
      }
    }
  });
  expect(parse(fileContentYAML, fileExtensionYAML)).toEqual({
    common: {
      setting1: "Value 1",
      setting2: 200,
      setting3: true,
      setting6: {
        key: "value",
        doge: {
          wow: ""
        }
      }
    }
  });
});
