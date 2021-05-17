import * as fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';

export default (fpath1, fpath2) => {
  const root = process.cwd();
  const filepath1 = path.resolve(root, fpath1);
  const filepath2 = path.resolve(root, fpath2);

  const file1json = fs.readFileSync(filepath1);
  const file2json = fs.readFileSync(filepath2);

  const file1content = JSON.parse(file1json);
  const file2content = JSON.parse(file2json);

  const keys = _.uniq([...Object.keys(file1content), ...Object.keys(file2content)]).sort();

  const result = keys.reduce((sum, key) => {
    if (!_.has(file2content, key)) {
      return `${sum}  - ${key}: ${file1content[key]}\n`;
    }
    if (!_.has(file1content, key)) {
      return `${sum}  + ${key}: ${file2content[key]}\n`;
    }
    if (file1content[key] === file2content[key]) {
      return `${sum}    ${key}: ${file2content[key]}\n`;
    }
    return `${sum}  - ${key}: ${file1content[key]}\n  + ${key}: ${file2content[key]}\n`;
  }, '{\n');

  return `${result}}`;
};
