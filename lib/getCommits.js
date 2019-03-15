const git = require('simple-git')();
const PrettyFormats = require('./PrettyFormats');
const splitCommitByTag = require('./splitCommitByTag');

module.exports = function getCommits(args, setting) {
  return new Promise((resolve) => {
    git.raw(['log', ...args, PrettyFormats.arg], (err, result) => {
      if (err) throw new Error(err);

      resolve(splitCommitByTag(PrettyFormats.parse(result), setting));
    });
  });
};
