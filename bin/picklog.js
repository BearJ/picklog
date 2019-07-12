#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');
const yargs = require('yargs');
const picklog = require('../index');

const { argv } = yargs
  .alias('h', 'help')
  .alias('v', 'version')

  .option('g', {
    alias: 'gitLogArgs',
    describe: 'Pass the arg to "git log". Splited by comma. e.g: picklog -g v2.0.0',
  })
  .option('l', {
    alias: 'latest',
    describe: 'Only pick latest changes after the last tag.',
  })

  .option('w', {
    alias: 'write',
    describe: 'Append stdout to this file.',
  })
  .option('o', {
    alias: 'overwrite',
    describe: 'Overwrite stdout to this file.',
  });

if (argv.overwrite && typeof argv.overwrite !== 'string') {
  console.warn('Please type a file name. eg: picklog -o changelog.md');
  return;
}

if (argv.write && typeof argv.write !== 'string') {
  console.warn('Please type a file name. eg: picklog -w changelog.md');
  return;
}

picklog(argv)
  .then((commits) => {
    if (argv.overwrite) {
      fs.writeFileSync(resolve(argv.overwrite), commits, 'utf8');
    } else if (argv.write) {
      fs.writeFileSync(resolve(argv.write), commits + fs.readFileSync(resolve(argv.write), 'utf8'));
    } else {
      console.log(commits);
    }
  });
