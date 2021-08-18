#!/usr/bin/env node

const fs = require('fs');
const { resolve } = require('path');
const yargs = require('yargs');
const git = require('simple-git')();
const picklog = require('../index');

function initPicklog() {
  try {
    fs.accessSync(resolve('.picklogrc.js'));
    console.log('File .picklogrc is in your project, so it\'s no need to init.');
  } catch (error) {
    git.raw(['config', '--get', 'remote.origin.url'], (err, result) => {
      if (err) throw err;

      const gitUrl = result.replace(/\n/g, '').replace(/\.git$/, '');
      fs.writeFileSync('.picklogrc.js', fs.readFileSync(resolve(__dirname, '.picklogrc.js'), 'utf-8').replace(/<%= GitURL %>/, gitUrl));
      console.log('Init Success!');
    });
  }
}

const { argv } = yargs
  .alias('h', 'help')
  .alias('v', 'version')

  .command('init', 'Generator a .picklogrc file.')
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
  })
  .option('c', {
    alias: 'config',
    describe: 'Custom config file. (Default ".picklogrc")',
  });

if (argv._.indexOf('init') > -1) {
  initPicklog();
} else if (argv.overwrite && typeof argv.overwrite !== 'string') {
  console.warn('Please type a file name. eg: picklog -o changelog.md');
} else if (argv.write && typeof argv.write !== 'string') {
  console.warn('Please type a file name. eg: picklog -w changelog.md');
} else {
  picklog(argv)
    .then((commits) => {
      if (argv.overwrite) {
        fs.appendFileSync(resolve(argv.overwrite), '');
        fs.writeFileSync(resolve(argv.overwrite), commits, 'utf8');
      } else if (argv.write) {
        fs.appendFileSync(resolve(argv.write), '');
        fs.writeFileSync(resolve(argv.write), commits + fs.readFileSync(resolve(argv.write), 'utf8'));
      } else {
        console.log(commits);
      }
    });
}
