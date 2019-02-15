const path = require('path');
const getCommits = require('./lib/getCommits');

const setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line import/no-dynamic-require

function picklog(_args) {
  let args = _args;

  if (typeof args === 'string') {
    args = args.split(' ');
  }

  return new Promise((resolve) => {
    getCommits(args, setting)
      .then(commits => resolve(setting.parse(commits)));
  });
}

module.exports = picklog;
