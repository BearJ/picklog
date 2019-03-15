const git = require('simple-git')();
const PrettyFormats = require('./PrettyFormats');
const splitCommitByTag = require('./splitCommitByTag');


function getLogByHashs(hashs) {
  return new Promise((resolve) => {
    let commitStr = '';

    function show(hash) {
      git.show([hash, PrettyFormats.arg], (err, result) => {
        if (result) commitStr += result.match(new RegExp(`[\\s\\S]*${PrettyFormats.END}`))[0];

        const nextHash = hashs.pop();
        if (!nextHash) resolve(commitStr);
        else show(nextHash);
      });
    }
    show(hashs.pop());
  });
}

function getCommitHashs(result) {
  return new Promise((resolve) => {
    if (!result) resolve([]);

    const commitHashs = [];
    result.split('\n').forEach((str) => {
      const hash = str.split('+ ');
      if (hash.length < 2) return;

      commitHashs.push(hash[1]);
    });

    getLogByHashs(commitHashs).then((commitStr) => {
      resolve(PrettyFormats.parse(commitStr));
    });
  });
}

module.exports = function getLatestCommits(commits, setting) {
  return new Promise((resolve) => {
    if (!commits.length) resolve(commits, setting);

    function resolveCommit(result) {
      getCommitHashs(result)
        .then((latestCommits) => {
          resolve([Object.assign({}, commits[0], splitCommitByTag(latestCommits, setting)[0])]);
        });
    }
    git.raw(['cherry', commits[0].commits[0].H], (err1, result1) => {
      if (result1) {
        resolveCommit(result1);
      } else {
        git.raw(['cherry', commits[1].commits[0].H], (err2, result2) => {
          resolveCommit(result2);
        });
      }
    });
  });
};
