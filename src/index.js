import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath1), 'utf-8'));
  const obj2 = JSON.parse(readFileSync(path.resolve(process.cwd(), '__fixtures__', filepath2), 'utf-8'));
  const combinedKeys = _.union(Object.keys(obj1), Object.keys(obj2));

  const dataOnlyInObj1 = combinedKeys
    .reduce((acc, key) => {
      if (!(key in obj2)) {
        return {
          ...acc,
          [key]: obj1[key],
        };
      }
      return acc;
    }, {});

  const dataOnlyInObj2 = combinedKeys
    .reduce((acc, key) => {
      if (!(key in obj1)) {
        return {
          ...acc,
          [key]: obj2[key],
        };
      }
      return acc;
    }, {});

  const correspondingData = combinedKeys
    .reduce((acc, key) => {
      if (key in obj1 && key in obj2 && obj1[key] === obj2[key]) {
        return {
          ...acc,
          [key]: obj1[key],
        };
      }
      return acc;
    }, {});

  const diffValuesInObj1 = combinedKeys
    .reduce((acc, key) => {
      if (obj1[key] !== obj2[key] && obj1[key] !== dataOnlyInObj1[key]) {
        return {
          ...acc,
          [key]: obj1[key],
        };
      }
      return acc;
    }, {});

  const diffValuesInObj2 = combinedKeys
    .reduce((acc, key) => {
      if (obj1[key] !== obj2[key] && obj2[key] !== dataOnlyInObj2[key]) {
        return {
          ...acc,
          [key]: obj2[key],
        };
      }
      return acc;
    }, {});

  const aggregatedArray = [
    dataOnlyInObj1,
    dataOnlyInObj2,
    correspondingData,
    diffValuesInObj1,
    diffValuesInObj2,
  ];

  const entriesArray = aggregatedArray.flatMap((item) => Object.entries(item));
  const arrayToSort = entriesArray.map((item) => {
    let tempObject = {};

    if (item[0] in dataOnlyInObj1) {
      tempObject = {
        operator: '-',
        filename: filepath1,
        key: item[0],
        value: item[1],
      };
    }
    if (item[0] in dataOnlyInObj2) {
      tempObject = {
        operator: '+',
        filename: filepath2,
        key: item[0],
        value: item[1],
      };
    }
    if (item[0] in correspondingData) {
      tempObject = {
        operator: ' ',
        filename: filepath1,
        key: item[0],
        value: item[1],
      };
    }
    if (item[0] in diffValuesInObj1 && diffValuesInObj1[item[0]] === item[1]) {
      tempObject = {
        operator: '-', filename: filepath1, key: item[0], value: item[1],
      };
    }
    if (item[0] in diffValuesInObj2 && diffValuesInObj2[item[0]] === item[1]) {
      tempObject = {
        operator: '+', filename: filepath2, key: item[0], value: item[1],
      };
    }
    return tempObject;
  });

  const sortedResult = _.sortBy(arrayToSort, ['filename', 'key']);

  const result = sortedResult.map((item) => `  ${item.operator} ${item.key}: ${item.value}`).join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;
