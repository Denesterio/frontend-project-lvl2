import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = fs.readFileSync(getFixturePath('result.txt'), 'utf-8').trim();

const resultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const resultStyle = fs.readFileSync(getFixturePath('result_stylish.txt'), 'utf-8').trim();
const resultJSON = fs.readFileSync(getFixturePath('result_json.txt'), 'utf-8').trim();
const plainResult = fs.readFileSync(getFixturePath('result_plain.txt'), 'utf-8').trim();

test('getdiff .json files', () => {
  const fpath1 = getFixturePath('file1.json');
  const fpath2 = getFixturePath('file2.json');
  const fpath111 = getFixturePath('file111.json');
  const fpath112 = getFixturePath('file112.json');
  expect(gendiff(fpath1, fpath2, 'stylish')).toEqual(result);
  expect(gendiff(fpath1, fpath2, 'plain')).toEqual(resultPlain);
  expect(gendiff(fpath1, fpath2, 'json')).toEqual(resultJSON);
  expect(gendiff(fpath111, fpath112)).toEqual(resultStyle);
  expect(gendiff(fpath111, fpath112, 'plain')).toEqual(plainResult);
});

test('gendiff .yaml files', () => {
  const fpath1 = getFixturePath('file1.yml');
  const fpath2 = getFixturePath('file2.yml');
  const fpath111 = getFixturePath('file111.yml');
  const fpath112 = getFixturePath('file112.yml');
  expect(gendiff(fpath1, fpath2, 'stylish')).toEqual(result);
  expect(gendiff(fpath1, fpath2, 'plain')).toEqual(resultPlain);
  expect(gendiff(fpath1, fpath2, 'json')).toEqual(resultJSON);
  expect(gendiff(fpath111, fpath112, 'stylish')).toEqual(resultStyle);
  expect(gendiff(fpath111, fpath112, 'plain')).toEqual(plainResult);
});
