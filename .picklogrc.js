const dateFormat = require('dateformat');

const origin = 'https://github.com/BearJ/picklog';
const comparePath = `${origin}/compare/`;
const commitPath = `${origin}/commit/`;

module.exports = {
  filters: [
    {
      name: 'Features',
      regExp: /^feat(\(.*?\))?:\s/i,
    },
    {
      name: 'Bugfixes',
      regExp: /^fix(\(.*?\))?:\s/i,
    },
    {
      name: 'Performance Improvements',
      regExp: /^perf(\(.*?\))?:\s/i,
    },
    {
      name: 'Reverts',
      regExp: /^revert(\(.*?\))?:\s/i,
    }
  ],
  parse(picklog){
    // RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
    // return JSON.stringify(picklog, null, 2);

    let output = '';

    picklog.forEach((log) => {
      output += `### [${log.tag}](${comparePath}${log.previousTag || ''}...${log.tag}) (${dateFormat(log.timestamp * 1000, 'yyyy-mm-dd')})\n`;

      log.results.forEach((result) => {
        output += `#### ${result.filter.name}\n`;

        result.commits.forEach((commit) => {
          output += `* ${commit.s}([${commit.h}](${commitPath}${commit.h}))\n`;
        });

        output += '\n';
      });

      output += '\n\n';
    });

    return output;
  },
};