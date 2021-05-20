import _ from 'lodash';
import {
  getChildren,
  getIdAsArray,
  getValues,
  getKey,
  isMain,
} from '../src/makers.js';

const idToMark = {
  1: '- ',
  2: '+ ',
  0: '  ',
  none: '',
};

const stringify = (value, replacer = ' ', spaceCount = 1) => {
  const iter = (currentValue, depth) => {
    if (typeof currentValue !== 'object') return String(currentValue);

    const indent = spaceCount === depth
      ? replacer.repeat(spaceCount + depth)
      : replacer.repeat(spaceCount * depth);
    const closingBracketIndent = spaceCount === depth
      ? replacer.repeat(spaceCount + depth - 2)
      : replacer.repeat(spaceCount * (depth - 1));

    const lines = Object.entries(currentValue).map(
      ([key, v]) => `${indent}${key}: ${iter(v, depth + 1)}`,
    );
    const result = ['{', ...lines, `${closingBracketIndent}}`].join('\n');
    return result;
  };
  return iter(value, spaceCount);
};

const stylish = (tree) => {
  const iter = (current, depth) => {
    const key = getKey(current, ':');
    const children = getChildren(current);
    const values = getValues(current);
    const ids = getIdAsArray(current);

    const replacer = '  ';
    const marks = ids.map((id) => idToMark[id]);
    const indentHalf = replacer.repeat(depth);
    const indentBeforeMark = indentHalf.slice(0, indentHalf.length - 2);
    const bracketsIndent = indentHalf.repeat(2);
    const indents = marks.map((mark) => (isMain(current) ? '' : `${indentHalf}${indentBeforeMark}${mark}`));

    if (!children) {
      return values.map((value, index) => {
        if (_.isPlainObject(value)) {
          return `${indents[index]}${key} ${stringify(value, replacer, depth + 1)}`;
        }
        return value === '' ? `${indents[index]}${key}${value}` : `${indents[index]}${key} ${value}`;
      });
    }

    const lines = children.flatMap((child) => iter(child, depth + 1));
    const spaces = isMain(current) ? '' : ' ';
    return [`${bracketsIndent}${key}${spaces}{`, ...lines, `${bracketsIndent}}`].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;
