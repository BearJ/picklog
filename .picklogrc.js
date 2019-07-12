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
      let date = new Date(log.timestamp * 1000);
      date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).substr(-2)}-${('0' + date.getDate()).substr(-2)}`;

      output += `### [${log.tag}](${comparePath}${log.previousTag || ''}...${log.tag}) (${date})\n\n`;

      log.results.forEach((result) => {
        output += `#### ${result.filter.name}\n`;

        result.commits.forEach((commit) => {
          const regExp = result.filter.regExp;
          let subject = commit.s.match(regExp) || '';

          if(subject[1]){
            const type = subject[1].match(/\((.*?)\)/)[1];

            subject = `**${type}:** ${commit.s.replace(regExp, '')}`;
          }else{
            subject = commit.s.replace(regExp, '');
          }

          output += `* ${subject}([${commit.h}](${commitPath}${commit.h}))\n`;
        });

        output += '\n';
      });

      output += '\n\n';
    });

    return output;
  },
};
