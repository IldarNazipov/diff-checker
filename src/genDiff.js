import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
    const obj1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
    const obj2 = JSON.parse(readFileSync(filepath2, 'utf-8'));
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const keys = _.union(keys1, keys2);

    const dataOnlyInObj1 = keys.filter((key) => !(key in obj2)).reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
    const dataOnlyInObj2 = keys.filter((key) => !(key in obj1)).reduce((acc, key) => ({ ...acc, [key]: obj2[key] }), {});
    const correspondingData = keys.filter((key) => key in obj1 && key in obj2 && obj1[key] === obj2[key]).reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
    const differentValuesInObj1 = keys.filter((key) => obj1[key] !== obj2[key] && obj1[key] !== dataOnlyInObj1[key]).reduce((acc, key) => ({ ...acc, [key]: obj1[key] }), {});
    const differentValuesInObj2 = keys.filter((key) => obj1[key] !== obj2[key] && obj2[key] !== dataOnlyInObj2[key]).reduce((acc, key) => ({ ...acc, [key]: obj2[key] }), {});

    const aggregatedArray = [dataOnlyInObj1, dataOnlyInObj2, correspondingData, differentValuesInObj1, differentValuesInObj2];
    const entriesArray = aggregatedArray.flatMap((item) => Object.entries(item));
    const arrayToSort = entriesArray.map((item) => {
        let tempObject = {};

        if (dataOnlyInObj1.hasOwnProperty(item[0])) {
            tempObject = { operator: '-', filename: filepath1, key: item[0], value: item[1] };
        }
        if (dataOnlyInObj2.hasOwnProperty(item[0])) {
            tempObject = { operator: '+', filename: filepath2, key: item[0], value: item[1] };
        }
        if (correspondingData.hasOwnProperty(item[0])) {
            tempObject = { operator: ' ', filename: filepath1, key: item[0], value: item[1] };
        }
        if (differentValuesInObj1.hasOwnProperty(item[0]) && differentValuesInObj1[item[0]] === item[1]) {
            tempObject = { operator: '-', filename: filepath1, key: item[0], value: item[1] };
        }
        if (differentValuesInObj2.hasOwnProperty(item[0]) && differentValuesInObj2[item[0]] === item[1]) {
            tempObject = { operator: '+', filename: filepath2, key: item[0], value: item[1] };
        }
        return tempObject;
    });
    
    const sortedResult = _.sortBy(arrayToSort, ['filename', 'key']);

   for (const item of sortedResult) {
    console.log(`${item.operator} ${item.key}: ${item.value}`);
   }
};
    // const dataOnlyInObj1 = {};
    // const dataOnlyInObj2 = {};
    // const correspondingData = {};
    // const differentValuesInObj1 = {};
    // const differentValuesInObj2 = {};

    // for (const [key, value] of entries) {
    //     if (!_.has(obj1, key)) {
    //         dataOnlyInObj2[key] = value;
    //     } else if (!_.has(obj2, key)) {
    //         dataOnlyInObj1[key] = value;
    //     } else if (obj1[key] !== obj2[key]) {
    //         differentValuesInObj1[key] = obj1[key];
    //         differentValuesInObj2[key] = obj2[key];
    //     } else {
    //         correspondingData[key] = value;
    //     }
    // }


export default genDiff;
