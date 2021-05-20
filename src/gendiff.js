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

  const file1content = parse(fs.readFileSync(filepath1, 'utf-8'), path.extname(filepath1));
  const file2content = parse(fs.readFileSync(filepath2, 'utf-8'), path.extname(filepath2));

  const diffObject = getDiff(file1content, file2content);
  const formatters = {
    plain: (o) => plain(o),
    json: (o) => json(o),
    stylish: (o) => stylish(o),
  };
  return formatters[formatter](diffObject);
};
