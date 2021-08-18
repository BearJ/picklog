module.exports = {
  filters: [
    {
      name: 'Changes',
      regExp: /[\u4e00-\u9fa5]/,
    },
  ],
  parse(commits){
    const feats = []
    const fixs = []
    const others = []

    commits.forEach((log) => {
      log.results.forEach((result) => {
        result.commits.forEach((commit) => {
          const logText = `- ${commit.s} ${commit.an}`

          if (/feat/.test(commit.s)) {
            feats.push(logText)
          } else if (/fix/.test(commit.s)) {
            fixs.push(logText)
          } else {
            others.push(logText)
          }
        });
      });
    });

    return `${feats.join('\n')}\n\n${fixs.join('\n')}\n\n${others.join('\n')}`;
  }
};
