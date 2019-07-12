module.exports = function getFilterCommitsWithSetting(tagCommitObjList, setting) {
  tagCommitObjList.forEach((tagCommitObj) => {
    const results = [];

    setting.filters.forEach((filter) => {
      const result = {
        filter,
        commits: [],
      };

      tagCommitObj.commits.forEach((commit) => {
        if (filter.regExp.test(commit.s)) {
          result.commits.push(commit);
        }
      });

      if (result.commits.length) results.push(result);
    });

    tagCommitObj.results = results;
  });

  return tagCommitObjList;
};
