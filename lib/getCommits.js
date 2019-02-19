const git = require('simple-git')();
const PrettyFormats = require('./PrettyFormats');
const splitCommitByTag = require('./splitCommitByTag');

const END = '==END==';
const SPLIT = '==SPLIT==';

const prettyFormatArg = `--pretty=${Object.values(PrettyFormats).join(SPLIT)}${END}`;

module.exports = function getCommits(args, setting) {
  return new Promise((resolve) => {
    git.raw(['log', ...args, prettyFormatArg], (err, result) => {
      const keys = Object.keys(PrettyFormats);
      const commitsStr = result.trim();
      if (!commitsStr.length) return;

      let commits = commitsStr
        .split(END)
        .filter(commitStr => commitStr && commitStr !== SPLIT);

      commits = commits.map((commitStr) => {
        const commit = {};
        commitStr.replace(/^\n/, '')
          .split(SPLIT)
          .forEach((val, index) => {
            commit[keys[index]] = val;
          });
        return commit;
      });

      resolve(splitCommitByTag(commits, setting));
    });
  });
};
