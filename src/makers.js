const isTree = (node) => 'children' in node;
const getChildren = (tree) => tree.children;
const getKey = (node, str = '') => (node.key === '' ? '' : `${node.key}${str}`);
const getIdAsArray = (node) => node.id.split('');
const getValues = (node) => node.values;
const isMain = (tree) => (tree.id === 'main');

const makeTree = (key, children, id) => {
  const tree = {
    key,
    children,
    id,
  };
  return tree;
};

const makeNode = (key, values, id) => {
  const node = {
    key,
    values,
    id,
  };
  return node;
};

export {
  makeTree,
  makeNode,
  isTree,
  getChildren,
  getIdAsArray,
  getValues,
  getKey,
  isMain,
};
