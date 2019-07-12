function getTagName(decorate) {
  const tagMatch = decorate.match(/tag:\s([^,)]*)/);

  if (tagMatch) {
    return tagMatch[1];
  }

  return '';
}

function getCommitObj(commit) {
  return {
    tag: getTagName(commit.d),
    timestamp: commit.at,
    commitHash: commit.H,
    commits: [commit],
  };
}

module.exports = function splitCommitByTag(commits) {
  if (!commits || commits.length < 1) return [];

  const result = [];
  let commitObject = getCommitObj(commits.splice(0, 1)[0]);

  commits.forEach((commit) => {
    const tagName = getTagName(commit.d);

    if (tagName) {
      // 该commit有tag

      result.push(Object.assign(commitObject, {
        previousTag: tagName,
      }));

      commitObject = getCommitObj(commit);
    } else {
      // 该commit没tag

      commitObject.commits.push(commit);
    }
  });

  if (commitObject.commits.length > 1) {
    result.push(Object.assign(commitObject, {
      previousTag: '',
    }));
  }

  return result;
};
