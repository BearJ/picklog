#!/usr/bin/env node
/*
 Author: bearyan <bearyanjh@foxmail.com>
 */

// const fs = require('fs');
const { ArgumentParser } = require('argparse');
const packageConf = require('./package.json');

const parser = new ArgumentParser({
  version: packageConf.version,
  addHelp: true,
  description: 'Pick changelog from git log.',
});

const args = parser.parseArgs();
console.dir(args);
