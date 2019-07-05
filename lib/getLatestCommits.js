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
          let mergeCommits = commits[0].commits.concat(latestCommits);
          let lastCommitH = '';

          mergeCommits = mergeCommits
            .sort((commitA, commitB) => commitB.ct - commitA.ct)
            .filter((commit) => {
              if (commit.H === lastCommitH) return false;

              lastCommitH = commit.H;
              return true;
            });

          resolve([Object.assign({}, commits[0], splitCommitByTag(mergeCommits, setting)[0])]);
        });
    }
    git.raw(['cherry', commits[0].commits[0].H], (err1, result1) => { // 找到commits分组第一个分组的第一个commit
      if (result1) { // 如果有结果，就表示是当前的commit就满足需求了
        resolveCommit(result1);
      } else if (commits.length > 1) { // 如果有第二组commits，就找
        git.raw(['cherry', commits[1].commits[0].H], (err2, result2) => {
          resolveCommit(result2);
        });
      } else {
        // 否则，认为是还没有提交过tag，则取第一组的最后一个commit来cherry
        git.raw(['cherry', commits[0].commits[commits[0].commits.length - 1].H], (err2, result2) => {
          resolveCommit(result2);
        });
      }
    });
  });
};
