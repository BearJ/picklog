const path = require('path');
const through2 = require('through2');
const { spawn } = require('child_process');
const fwd = require('spawn-error-forwarder');

const setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line import/no-dynamic-require

const END = '==END==';
const SPLIT = '==SPLIT==';

const map = {
  H: '%H', // commit hash
  h: '%h', // abbreviated commit hash
  T: '%T', // tree hash
  t: '%t', // abbreviated tree hash
  P: '%P', // parent hashes
  p: '%p', // abbreviated parent hashes
  an: '%an', // author name
  ae: '%ae', // author email
  ad: '%ad', // author date (format respects --date= option)
  ar: '%ar', // author date, relative
  at: '%at', // author date, UNIX timestamp
  ai: '%ai', // author date, ISO 8601-like format
  cn: '%cn', // committer name
  ce: '%ce', // committer email
  cd: '%cd', // committer date (format respects --date= option)
  cr: '%cr', // committer date, relative
  ct: '%ct', // committer date, UNIX timestamp
  ci: '%ci', // committer date, ISO 8601-like format
  d: '%d', // ref names, like the --decorate option of git-log(1)
  e: '%e', // encoding
  s: '%s', // subject
  f: '%f', // sanitized subject line, suitable for a filename
  b: '%b', // body
  B: '%B', // raw body (unwrapped subject and body)
  N: '%N', // commit notes
};
const prettyFormat = `--pretty=${Object.values(map).join(SPLIT)}${END}`;

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

function picklog(args) {
  let commitsStr = '';

  return new Promise((resolve) => {
    fwd(
      spawn('git', ['log', ...args, prettyFormat]),
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
        const keys = Object.keys(map);
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

        commits = setting.parse(parse(commits));

        process.stdout.write(commits);

        resolve(commits);
      });
  });
}

module.exports = picklog;
