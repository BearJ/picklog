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
    picklog.forEach((log) => {
      log.commits.forEach((commit) => {
        delete commit.ar;
        delete commit.cr;
      });
      log.results.forEach((result) => {
        result.commits.forEach((commit) => {
          delete commit.ar;
          delete commit.cr;
        });
      });
    });

    RegExp.prototype.toJSON = RegExp.prototype.toString;
    return JSON.stringify(picklog, null, 2);
  },
};