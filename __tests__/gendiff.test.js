import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

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

const resultJSON = '{"key":"","children":[{"key":"common","children":[{"key":"follow","values":[false],"id":"2"},{"key":"setting1","values":["Value 1"],"id":"0"},{"key":"setting2","values":[200],"id":"1"},{"key":"setting3","values":[true,null],"id":"12"},{"key":"setting4","values":["blah blah"],"id":"2"},{"key":"setting5","values":[{"key5":"value5"}],"id":"2"},{"key":"setting6","children":[{"key":"doge","children":[{"key":"wow","values":["","so much"],"id":"12"}],"id":"0"},{"key":"key","values":["value"],"id":"0"},{"key":"ops","values":["vops"],"id":"2"}],"id":"0"}],"id":"0"},{"key":"group1","children":[{"key":"baz","values":["bas","bars"],"id":"12"},{"key":"foo","values":["bar"],"id":"0"},{"key":"nest","values":[{"key":"value"},"str"],"id":"12"}],"id":"0"},{"key":"group2","values":[{"abc":12345,"deep":{"id":45}}],"id":"1"},{"key":"group3","values":[{"deep":{"id":{"number":45}},"fee":100500}],"id":"2"}],"id":"main"}';
const resultStyle = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
    group4: {
      - default: null
      + default:
      - foo: 0
      + foo: null
      - isNested: false
      + isNested: none
      + key: false
        nest: {
          - bar:
          + bar: 0
          - isNested: true
        }
      + someKey: true
      - type: bas
      + type: bar
    }
}`;

test('getdiff .json files', () => {
  const fpath1 = getFixturePath('file1.json');
  const fpath2 = getFixturePath('file2.json');
  const fpath111 = getFixturePath('file111.json');
  const fpath112 = getFixturePath('file112.json');
  expect(gendiff(fpath1, fpath2, 'stylish')).toEqual(result);
  expect(gendiff(fpath1, fpath2, 'plain')).toEqual(resultPlain);
  expect(gendiff(fpath1, fpath2, 'json')).toEqual(resultJSON);
  expect(gendiff(fpath111, fpath112)).toEqual(resultStyle);
  // expect(gendiff(fpath111, fpath112, 'plain')).toEqual(plainResult);
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
  // expect(gendiff(fpath111, fpath112, 'plain')).toEqual(plainResult);
});
