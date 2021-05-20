const isTree = (node) => 'children' in node;

const makeTree = (key, children, id) => {
  const tree = {
    key,
    children,
    id,
    getChildren() {
      return this.children;
    },
    getKey(str = '') {
      return this.key === '' ? '' : `${this.key}${str}`;
    },
    getId() {
      return this.id;
    },
    isMainTree() {
      return this.key === '';
    },
  };
  return tree;
};

const makeNode = (key, values, id) => {
  const node = {
    key,
    values,
    id,
    isObjectValue() {
      return typeof this.value === 'object';
    },
    getId() {
      return this.id;
    },
    getKey(str = '') {
      return `${this.key}${str}`;
    },
    getValues() {
      return this.values;
    },
  };
  return node;
};

export { makeTree, makeNode, isTree };
