import _ from 'lodash';
import { makeTree, makeNode } from './makers.js';

const getDiff = (file1, file2) => {
  const getChildren = (content1, content2) => {
    const uniqKeys = _.uniq([...Object.keys(content1), ...Object.keys(content2)]).sort();
    const children = uniqKeys.reduce((diff, key) => {
      if (!_.has(content2, key)) {
        diff.push(makeNode(key, [_.cloneDeep(content1[key])], ['1']));
        return diff;
      }
      if (!_.has(content1, key)) {
        diff.push(makeNode(key, [_.cloneDeep(content2[key])], ['2']));
        return diff;
      }
      if (_.isEqual(content1[key], content2[key])) {
        diff.push(makeNode(key, [_.cloneDeep(content1[key])], ['0']));
        return diff;
      }
      if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        diff.push(
          makeNode(key, [_.cloneDeep(content1[key]), _.cloneDeep(content2[key])], ['1', '2']),
        );
        return diff;
      }
      diff.push(makeTree(key, getChildren(content1[key], content2[key]), ['0']));
      return diff;
    }, []);
    return children;
  };
  return makeTree('', getChildren(file1, file2), ['none']);
};

export default getDiff;
