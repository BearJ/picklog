module.exports = {
  filters: [
    {
      name: 'Features',
      regExp: /^feat(\(.*?\))?:\s/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix(\(.*?\))?:\s/i,
    }
  ],
  parse(picklog){
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    return JSON.stringify(picklog, null, 2);
  },
};