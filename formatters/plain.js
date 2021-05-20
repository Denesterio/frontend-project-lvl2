import _ from 'lodash';

const isConsist = (something) => something !== undefined;

const getStringFromId = (id, prop, ...values) => {
  const newValues = values.map((v) => (typeof v === 'object' ? '[complex value]' : `'${v}'`));
  const [value1, value2] = newValues;
  const idToMark = {
    1: `Property '${prop}' was removed`,
    2: `Property '${prop}' was added with value: ${value1}`,
  };

  if (value2) {
    idToMark['0'] = `Property '${prop}' was updated. From ${value1} to '${value2}`;
  }
  return idToMark[id];
};

const plain = (tree) => {
  const iter = (current, pathTo) => {
    const key = current.key ?? '';
    const { children, id, value } = current;
    if (!children) {
      const finalPath = `${pathTo}.${key}`.slice(2);
      return getStringFromId(id, finalPath, value);
    }
    const paths = children.map((child) => iter(child, `${pathTo}.${key}`));
    return paths.flat().filter(isConsist).join('\n');
  };

  return iter(tree, '');
};

export default plain;
