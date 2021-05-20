import * as fs from 'fs';
import path from 'path';
import process from 'process';
import parse from './parse.js';
import getDiff from './differ.js';
import { stylish, plain, json } from '../formatters/index.js';

export default (fpath1, fpath2, formatter = stylish) => {
  const root = process.cwd();
  const filepath1 = path.resolve(root, fpath1);
  const filepath2 = path.resolve(root, fpath2);

  const file1content = parse(fs.readFileSync(filepath1, 'utf8'), path.extname(filepath1));
  const file2content = parse(fs.readFileSync(filepath2, 'utf8'), path.extname(filepath2));

  const diffObject = getDiff(file1content, file2content);
  if (formatter === 'plain') {
    return plain(diffObject);
  }
  if (formatter === 'json') {
    return json(diffObject);
  }
  return stylish(diffObject);
};
