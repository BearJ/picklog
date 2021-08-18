const fs = require('fs');
const path = require('path');
const picklog = require('../index');

const lastCommit = fs.readFileSync(path.resolve('.lastcommit'), 'utf8').trim();

picklog({
  gitLogArgs: `...${lastCommit}`,
  config: '.picklogrc.devops.js',
}).then((text) => {
  console.log(text);
});
