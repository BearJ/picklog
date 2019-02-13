#!/usr/bin/env node

const picklog = require('../index');

picklog(process.argv.slice(2))
  .then((commits) => {
    process.stdout.write(commits);
  });
