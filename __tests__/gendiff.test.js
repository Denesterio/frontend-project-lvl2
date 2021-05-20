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

const result2 = `{
    common: {
        setting1: Value 1
        setting2: 200
        setting3: true
        setting6: {
            doge: {
                wow: 
            }
            key: value
            value: {
              - size: 2
              + size: 1
              - type: string
              + type: boolean
            }
        }
    }
    soft: {
        Office: 90%
        Games: 10%
    }
  - time: 2 weeks
  + time: 3 weeks
    users: {
        user1: {
          - age: 34
          + age: 35
          - name: Petr
          + name: Ivan
            surname: Ivanov
        }
        user2: {
          - age: 28
          + age: 29
            name: Elena
            surname: Titova
        }
    }
    work: {
      + after tomorrow: {
            tour: after 12:00
        }
        today: {
            palaver: {
              - end: 13:00
              + end: 14:00
              - start: 12:00
              + start: 13:00
            }
          - sells: {
                time: after palaver
            }
        }
      - tomorrow: {
            tour: all day
        }
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

test('getdiff .json files', () => {
  const fpath1 = getFixturePath('file1.json');
  const fpath2 = getFixturePath('file2.json');
  const fpath3 = getFixturePath('file3.json');
  const fpath4 = getFixturePath('file4.json');
  expect(gendiff(fpath1, fpath2, 'stylish')).toEqual(result);
  expect(gendiff(fpath3, fpath4, 'stylish')).toEqual(result2);
  expect(gendiff(fpath1, fpath2, 'plain')).toEqual(resultPlain);
});

test('gendiff .yaml files', () => {
  const fpath1 = getFixturePath('file1.yaml');
  const fpath2 = getFixturePath('file2.yaml');
  expect(gendiff(fpath1, fpath2, 'stylish')).toEqual(result);
  expect(gendiff(fpath1, fpath2, 'plain')).toEqual(resultPlain);
});
