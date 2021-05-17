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
  const assigned1Content = { ...file2content, ...file1content };

  const keys = Object.keys(assigned1Content).sort();

  const result = keys.reduce((sum, key) => {
    if (_.has(assigned1Content, key) && !_.has(file2content, key)) {
      const res = `${sum}  - ${key}: ${assigned1Content[key]}\n`;
      return res;
    }
    if (_.has(assigned1Content, key) && !_.has(file1content, key)) {
      const res = `${sum}  + ${key}: ${assigned1Content[key]}\n`;
      return res;
    }
    if (file1content[key] === file2content[key]) {
      const res = `${sum}    ${key}: ${file2content[key]}\n`;
      return res;
    }
    const res = `${sum}  - ${key}: ${file1content[key]}\n  + ${key}: ${file2content[key]}\n`;
    return res;
  }, '{\n');

  return `${result}}`;
};
