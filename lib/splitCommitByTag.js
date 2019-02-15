function getTagInfo(str) {
  return str.match(/tag: ([^,)]*)/);
}

module.exports = function splitCommitByTag(commits, setting) {
  const parseCommits = [];
  const filters = Array.isArray(setting.filters) ? setting.filters : [];
  let tagName = 'now';
  let tagCommits = [];
  let tagResult = {};

  commits.forEach((commit) => {
    const tagInfo = getTagInfo(commit.d);

    if (tagInfo) { // 该commit有tag
      parseCommits.push({
        tag: tagName,
        timestamp: (tagCommits.length && tagCommits[0].at) || (`${+new Date()}`).substr(0, 10),
        commits: tagCommits,
        results: Object.values(tagResult),
        previousTag: tagInfo[1],
      });

      [, tagName] = tagInfo;
      tagCommits = [commit];
      tagResult = {};
    } else { // 该commit没tag
      tagCommits.push(commit);
    }

    filters.forEach((filter) => {
      if (filter.regExp.test(commit.s)) {
        if (!tagResult[filter.name]) {
          tagResult[filter.name] = {
            filter,
            commits: [],
          };
        }
        tagResult[filter.name].commits.push(commit);
      }
    });
  });

  parseCommits.push({
    tag: tagName,
    timestamp: (tagCommits.length && tagCommits[0].at) || (`${+new Date()}`).substr(0, 10),
    commits: tagCommits,
    results: Object.values(tagResult),
  });

  if (!parseCommits[0].commits.length) parseCommits.splice(0, 1);

  return parseCommits;
};
