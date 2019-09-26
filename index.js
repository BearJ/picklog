const fs = require('fs');
const path = require('path');
const getCommits = require('./src/getCommits');
const defaultSetting = require('./src/lib/defaultSetting');

function picklog(_args) {
  const args = Object.assign({
    gitLogArgs: '', // 透传给命令 git log 的参数
    latest: false, // 是否只取上一个tag后的commit
  }, _args);
  let setting;
  let pkg;

  try {
    fs.accessSync(path.resolve('.picklogrc.js'));
    setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line global-require,import/no-dynamic-require

    fs.accessSync(path.resolve('package.json'));
    pkg = require(path.resolve('package.json')); // eslint-disable-line global-require,import/no-dynamic-require
  } catch (err) {
    setting = defaultSetting;
    pkg = {};
  }

  return new Promise((resolve) => {
    getCommits(args, setting).then((commits) => {
      if (commits.length && !commits[0].tag) {
        const pkgVersion = pkg.version;
        const [firstCommit] = commits;
        if (pkgVersion) {
          let { previousTag } = firstCommit;

          if (previousTag) {
            let prefix = previousTag.match(/^([^\d]*)/);
            if (prefix) [, prefix] = prefix;
            previousTag = previousTag.replace(prefix, '');

            if (pkgVersion !== previousTag && pkgVersion.split('.').length === previousTag.split('.').length) {
              firstCommit.tag = `${prefix}${pkgVersion}`;
            }
          } else {
            firstCommit.tag = `v${pkgVersion}`;
          }
        }
      }
      resolve(setting.parse(commits));
    });
  });
}

// picklog().then((commitStr) => {
//   fs.writeFileSync('bear.md', commitStr);
// });
module.exports = picklog;
