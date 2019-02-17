function getTagInfo(str) {
  return str.match(/tag: ([^,)]*)/);
}

module.exports = function splitCommitByTag(commits, setting) {
  const parseCommits = [];
  const filters = Array.isArray(setting.filters) ? setting.filters : [];
  let tagName = 'now';
  let tagCommits = [];
  let tagResult = {};

  filters.forEach((filter) => {
    tagResult[filter.name] = {
      filter,
      commits: [],
    };
  });

  commits.forEach((commit) => {
    const tagInfo = getTagInfo(commit.d);

    if (tagInfo) { // 该commit有tag
      const results = [];
      Object.values(tagResult).forEach((result) => {
        if (result.commits.length) results.push(result);
      });

      parseCommits.push({
        tag: tagName,
        timestamp: (tagCommits.length && tagCommits[0].at) || (`${+new Date()}`).substr(0, 10), // 没有时间戳就表示最新的提交没有tag
        commits: tagCommits,
        results,
        previousTag: tagInfo[1],
      });

      [, tagName] = tagInfo;
      tagCommits = [commit];
      tagResult = {};
      filters.forEach((filter) => {
        tagResult[filter.name] = {
          filter,
          commits: [],
        };
      });
    } else { // 该commit没tag
      tagCommits.push(commit);
    }

    filters.forEach((filter) => {
      if (filter.regExp.test(commit.s)) {
        tagResult[filter.name].commits.push(commit);
      }
    });
  });

  const results = [];
  Object.values(tagResult).forEach((result) => {
    if (result.commits.length) results.push(result);
  });

  parseCommits.push({
    tag: tagName,
    timestamp: tagCommits.length && tagCommits[0].at,
    commits: tagCommits,
    results,
  });

  if (!parseCommits[0].commits.length) parseCommits.splice(0, 1);

  return parseCommits;
};
