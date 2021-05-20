const makeTree = (key, children) => {
  const tree = {
    key,
    children,
    getChildren() {
      return this.children;
    },
  };
  return tree;
};

const makeNode = (key, value, id) => {
  const node = {
    key,
    value,
    id,
    isObjectValue() {
      return typeof this.value === 'object';
    },
  };
  return node;
};

export { makeTree, makeNode };
