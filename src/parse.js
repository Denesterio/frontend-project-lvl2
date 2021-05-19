import yaml from 'js-yaml';

export default (fileContent, type) => (type === '.json'
  ? JSON.parse(fileContent)
  : yaml.load(fileContent));
