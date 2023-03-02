import _ from 'lodash';

const compareObjects = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.map((key) => {
    if (!(key in object1)) {
      return {
        key, state: 'added', value: object2[key],
      };
    }
    if (!(key in object2)) {
      return {
        key, state: 'deleted', value: object1[key],
      };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        key, state: 'nested', value: compareObjects(object1[key], object2[key]),
      };
    }
    if (object1[key] !== object2[key]) {
      return {
        key, state: 'changed', value1: object1[key], value2: object2[key],
      };
    }
    return {
      key, state: 'notChanged', value: object1[key],
    };
  });
};
export default compareObjects;
