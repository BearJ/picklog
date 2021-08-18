module.exports = {
  filters: [
    {
      name: 'Changes',
      regExp: /[\u4e00-\u9fa5]/,
    }
  ],
  parse(commits){
    let output = '';

    commits.forEach((log) => {
      log.results.forEach((result) => {
        output += `${result.filter.name}:\n`;

        result.commits.forEach((commit) => {
          output += `- ${commit.s} ${commit.an}\n`;
        });
      });
    });

    return output;
  }
};
