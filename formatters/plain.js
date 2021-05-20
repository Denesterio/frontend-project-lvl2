import { isTree } from '../src/makers.js';

const isConsist = (something) => something !== undefined;

const getStringFromId = (id, prop, values) => {
  const newValues = values.map((v) => {
    if (v === null) return null;
    if (typeof v === 'object') {
      return '[complex value]';
    }
    if (typeof v === 'string') {
      return `'${v}'`;
    }
    return v;
  });

  const [value1, value2] = newValues;
  if (values.length === 2) {
    return `Property '${prop}' was updated. From ${value1} to ${value2}`;
  }
  const idToMark = {
    1: `Property '${prop}' was removed`,
    2: `Property '${prop}' was added with value: ${value1}`,
  };
  return idToMark[id];
};

const plain = (tree) => {
  const iter = (current, pathTo) => {
    const key = current.getKey();
    const ids = current.getId();
    const data = isTree(current) ? current.getChildren() : current.getValues();
    if (!isTree(current)) {
      const finalPath = `${pathTo}.${key}`.slice(2);
      const idString = ids.join('');
      return getStringFromId(idString, finalPath, data);
    }
    const paths = data.map((child) => iter(child, `${pathTo}.${key}`));
    return paths.flat().filter(isConsist).join('\n');
  };

  return iter(tree, '');
};

export default plain;
