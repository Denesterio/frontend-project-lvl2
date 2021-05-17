import * as fs from 'fs';
import path from 'path';
import process from 'process';
import _ from 'lodash';
import parse from './parse.js';

export default (fpath1, fpath2) => {
  const root = process.cwd();
  const filepath1 = path.resolve(root, fpath1);
  const filepath2 = path.resolve(root, fpath2);

  const file1content = parse(fs.readFileSync(filepath1, 'utf-8'), path.extname(filepath1));
  const file2content = parse(fs.readFileSync(filepath2, 'utf-8'), path.extname(filepath2));

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
