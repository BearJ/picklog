/**
 * Return pretty-formats
 * More detail see: https://git-scm.com/docs/pretty-formats
 */
const values = require('object.values');

const END = '==END==';
const SPLIT = '==SPLIT==';

const format = {
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

if (!Object.values) {
  values.shim();
}

module.exports = {
  SPLIT,
  END,

  arg: `--pretty=${Object.values(format).join(SPLIT)}${END}`,

  parse(result) {
    const keys = Object.keys(format);
    const commitsStr = result.trim();
    if (!commitsStr.length) return [];

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

    return commits;
  },
};
