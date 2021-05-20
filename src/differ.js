import _ from 'lodash';
import { makeTree, makeNode } from './makers.js';

const getDiff = (file1, file2) => {
  const getChildren = (content1, content2) => {
    const uniqKeys = _.sortBy(_.uniq([...Object.keys(content1), ...Object.keys(content2)]));
    const children = uniqKeys.reduce((diff, key) => {
      if (!_.has(content2, key)) {
        const result = [...diff, makeNode(key, [_.cloneDeep(content1[key])], '1')];
        return result;
      }
      if (!_.has(content1, key)) {
        const result = [...diff, makeNode(key, [_.cloneDeep(content2[key])], '2')];
        return result;
      }
      if (_.isEqual(content1[key], content2[key])) {
        const result = [...diff, makeNode(key, [_.cloneDeep(content1[key])], '0')];
        return result;
      }
      if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        const values = [_.cloneDeep(content1[key]), _.cloneDeep(content2[key])];
        const result = [...diff, makeNode(key, values, '12')];
        return result;
      }
      const result = [...diff, makeTree(key, getChildren(content1[key], content2[key]), '0')];
      return result;
    }, []);
    return children;
  };
  return makeTree('', getChildren(file1, file2), 'main');
};

export default getDiff;
