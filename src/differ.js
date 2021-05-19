import _ from 'lodash';

const getDiff = (file1, file2) => {
  const getChildren = (content1, content2) => {
    const uniqKeys = _.uniq([...Object.keys(content1), ...Object.keys(content2)]).sort();
    const children = uniqKeys.reduce((diff, key) => {
      if (!_.has(content2, key)) {
        diff.push({ key, value: _.cloneDeep(content1[key]), id: '1' });
        return diff;
      }
      if (!_.has(content1, key)) {
        diff.push({ key, value: _.cloneDeep(content2[key]), id: '2' });
        return diff;
      }
      if (_.isEqual(content1[key], content2[key])) {
        diff.push({ key, value: _.cloneDeep(content1[key]), id: '0' });
        return diff;
      }
      if (!_.isPlainObject(content1[key]) || !_.isPlainObject(content2[key])) {
        diff.push(
          { key, value: _.cloneDeep(content1[key]), id: '1' },
          { key, value: _.cloneDeep(content2[key]), id: '2' },
        );
        return diff;
      }
      diff.push({ key, children: getChildren(content1[key], content2[key]), id: '0' });
      return diff;
    }, []);
    return children;
  };
  return { children: getChildren(file1, file2) };
};

export default getDiff;
