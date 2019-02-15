const path = require('path');
const through2 = require('through2');
const { spawn } = require('child_process');
const fwd = require('spawn-error-forwarder');
const PrettyFormats = require('./lib/PrettyFormats');

const setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line import/no-dynamic-require

const END = '==END==';
const SPLIT = '==SPLIT==';

const prettyFormatArg = `--pretty=${Object.values(PrettyFormats).join(SPLIT)}${END}`;

function getTagInfo(str) {
  return str.match(/tag: ([^,)]*)/);
}
function parse(commits) {
  const parseCommits = [];
  let tagName = 'now';
  let tagCommits = [];
  let tagResult = {};

  commits.forEach((commit) => {
    const tagInfo = getTagInfo(commit.d);

    if (tagInfo) { // 该commit有tag
      parseCommits.push({
        tag: tagName,
        timestamp: (tagCommits.length && tagCommits[0].at) || (`${+new Date()}`).substr(0, 10),
        commits: tagCommits,
        results: Object.values(tagResult),
        previousTag: tagInfo[1],
      });

      [, tagName] = tagInfo;
      tagCommits = [commit];
      tagResult = {};
    } else { // 该commit没tag
      tagCommits.push(commit);
    }

    setting.filters.forEach((filter) => {
      if (filter.regExp.test(commit.s)) {
        if (!tagResult[filter.name]) {
          tagResult[filter.name] = {
            filter,
            commits: [],
          };
        }
        tagResult[filter.name].commits.push(commit);
      }
    });
  });

  parseCommits.push({
    tag: tagName,
    timestamp: (tagCommits.length && tagCommits[0].at) || (`${+new Date()}`).substr(0, 10),
    commits: tagCommits,
    results: Object.values(tagResult),
  });

  if (!parseCommits[0].commits.length) parseCommits.splice(0, 1);

  return parseCommits;
}

function picklog(_args) {
  let args = _args;
  let commitsStr = '';

  if (typeof args === 'string') {
    args = args.split(' ');
  }

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

        resolve(setting.parse(parse(commits)));
      });
  });
}

module.exports = picklog;
