const through2 = require('through2');
const { spawn } = require('child_process');
const fwd = require('spawn-error-forwarder');
const PrettyFormats = require('./PrettyFormats');
const splitCommitByTag = require('./splitCommitByTag');

const END = '==END==';
const SPLIT = '==SPLIT==';

const prettyFormatArg = `--pretty=${Object.values(PrettyFormats).join(SPLIT)}${END}`;

module.exports = function getCommits(args, setting) {
  let commitsStr = '';

  return new Promise((resolve) => {
    fwd(
      spawn('git', ['log', ...args, prettyFormatArg]),
      (code, stderr) => new Error(`git log failed:\n\n${stderr}`),
    )
      .stdout
      .pipe(through2.obj((chunk, enc, callback) => {
        callback(null, chunk.toString('utf8'));
      }))
      .on('data', (data) => {
        commitsStr += data;
      })
      .on('end', () => {
        const keys = Object.keys(PrettyFormats);
        commitsStr = commitsStr.trim();
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
