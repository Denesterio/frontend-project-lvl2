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
      return this.id.split('');
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
    getId() {
      return this.id.split('');
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
