/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const splitCommitByTag = require('../../src/splitCommitByTag.js');
const commits = require('./commits');
const setting = require('./.picklogrc');

const output = fs.readFileSync(path.resolve(__dirname, 'output.json'), 'utf-8');

test('Test splitCommitByTag', () => {
  expect(setting.parse(splitCommitByTag(commits, setting))).toBe(output);
});
