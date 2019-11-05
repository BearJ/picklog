module.exports = {
  filters: [
    {
      name: 'Features',
      regExp: /^feat(\(.*?\))?:\s/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix(\(.*?\))?:\s/i,
    },
    {
      name: 'Performance Improvements',
      regExp: /^perf(\(.*?\))?:\s/i,
    },
    {
      name: 'Reverts',
      regExp: /^revert(\(.*?\))?:\s/i,
    },
  ],

  parse(logs) {
    /* eslint-disable-next-line no-extend-native */
    RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
    return JSON.stringify(logs, null, 2);
  },
};
