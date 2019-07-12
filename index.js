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

  try {
    fs.accessSync(path.resolve('.picklogrc.js'));
    setting = require(path.resolve('.picklogrc.js')); // eslint-disable-line global-require,import/no-dynamic-require
  } catch (err) {
    setting = defaultSetting;
  }

  return new Promise((resolve) => {
    getCommits(args, setting).then((commits) => {
      resolve(setting.parse(commits));
    });
  });
}

// picklog().then((commitStr) => {
//   fs.writeFileSync('bear.md', commitStr);
// });
module.exports = picklog;
