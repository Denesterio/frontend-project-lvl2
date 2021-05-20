import _ from 'lodash';

const idToMark = {
  1: '- ',
  2: '+ ',
  0: '  ',
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
    const key = current.key ? `${current.key}: ` : '';
    const { children } = current;

    const replacer = '  ';
    const mark = idToMark[current.id] ?? '';
    const indentHalf = replacer.repeat(depth);
    const indentBeforeMark = indentHalf.slice(0, indentHalf.length - 2);
    const indent = key === '' ? '' : `${indentHalf}${indentBeforeMark}${mark}`;

    if (!children) {
      if (_.isPlainObject(current.value)) {
        return `${indent}${key}${stringify(current.value, replacer, depth + 1)}`;
      }
      return `${indent}${key}${current.value}`;
    }

    const lines = children.flatMap((child) => iter(child, depth + 1));

    return [`${indent}${key}{`, ...lines, `${indent}}`].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;
