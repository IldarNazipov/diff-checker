import yaml from 'js-yaml';

export default (data, format) => {
  if (format === 'JSON') {
    return JSON.parse(data);
  }
  if (format === 'YAML') {
    return yaml.load(data);
  }
  throw new Error('not supported format');
};
