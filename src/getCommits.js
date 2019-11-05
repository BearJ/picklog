const git = require('simple-git')();
const ora = require('ora');

const PrettyFormats = require('./lib/PrettyFormats');
const splitCommitByTag = require('./splitCommitByTag');
const getFilterCommitsWithSetting = require('./getFilterCommitsWithSetting');

function gitLogLoop(tagCommitObjList) {
  return new Promise((resolve) => {
    const commitHashs = [];
    const spinner = ora();
    let index = 0;

    function isUnique(commit) {
      if (commitHashs.indexOf(commit.H) > -1) return false;

      commitHashs.push(commit.H);
      return true;
    }

    function loop() {
      return new Promise(async (loopResolve) => {
        const tagCommitObj = tagCommitObjList[index];

        if (index > tagCommitObjList.length - 1) {
          loopResolve();
          return;
        }

        let logSelection = '';
        if (tagCommitObj.previousTag) {
          logSelection = `${tagCommitObj.tag || ''}...${tagCommitObj.previousTag}`;
        } else {
          logSelection = `${tagCommitObj.tag || ''}...${tagCommitObj.commits[tagCommitObj.commits.length - 1].H}`;
        }

        git.raw(['log', logSelection, PrettyFormats.arg], (loopErr, loopResult) => {
          if (loopErr) throw loopErr;

          const commits = PrettyFormats.parse(loopResult);
          let mergeCommits = tagCommitObj.commits.concat(commits);

          spinner.text = `Loading logs ${logSelection} , Progress: ${index + 1}/${tagCommitObjList.length - 1}`;

          mergeCommits = mergeCommits
            .sort((commitA, commitB) => commitB.ct - commitA.ct)
            .filter(isUnique);

          tagCommitObj.commits = mergeCommits;
          index += 1;

          loop().then(loopResolve);
        });
      });
    }

    spinner.start();
    loop().then(() => {
      spinner.stop();
      resolve(tagCommitObjList);
    });
  });
}

module.exports = function getCommits(args, setting) {
  return new Promise((resolve) => {
    const gitLogArgs = args.gitLogArgs.split(',').filter(arg => arg !== '');

    git.raw(['log', ...gitLogArgs, PrettyFormats.arg], (err, result) => {
      if (err) throw err;

      let tagCommitObjList = splitCommitByTag(PrettyFormats.parse(result), setting);

      if (args.latest) {
        tagCommitObjList = tagCommitObjList.splice(0, 1);
      }

      gitLogLoop(tagCommitObjList).then((commits) => {
        resolve(getFilterCommitsWithSetting(commits, setting));
      });
    });
  });
};
