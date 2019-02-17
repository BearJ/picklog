const fs = require('fs');
const path = require('path');
const getCommits = require('./lib/getCommits');

const defaultSetting = {
  filters: [
    {
      name: 'Features',
      regExp: /^feat(\(.*?\))?:\s/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix(\(.*?\))?:\s/i,
    },
  ],
  parse(logs) {
    /* eslint-disable-next-line no-extend-native */
    RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
    return JSON.stringify(logs, null, 2);
  },
};

function picklog(_args = []) {
  let args = _args;
  let setting;

  if (typeof args === 'string') {
    args = args.split(' ');
  }

  try {
    fs.accessSync(path.resolve('.picklogrc.js'));
    setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line global-require,import/no-dynamic-require
  } catch (err) {
    setting = defaultSetting;
  }

  return new Promise((resolve) => {
    getCommits(args, setting)
      .then(commits => resolve(setting.parse(commits)));
  });
}
picklog();
module.exports = picklog;
