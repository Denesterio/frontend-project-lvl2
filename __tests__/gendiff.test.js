import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('get diff .json files', () => {
  const fpath1 = getFixturePath('file1.json');
  const fpath2 = getFixturePath('file2.json');
  expect(gendiff(fpath1, fpath2)).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});
