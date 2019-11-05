/* eslint-disable no-undef,max-len */

const fs = require('fs');
const path = require('path');

const splitCommitByTag = require('../../src/splitCommitByTag.js');
const commits = require('./input');

const setting = require('../.picklogrc');
const settingWithoutTagFilter = require('./without-tag-filter/.picklogrc');

const output = fs.readFileSync(path.resolve(__dirname, 'output.json'), 'utf-8');
const outputWithoutTagFilter = fs.readFileSync(path.resolve(__dirname, './without-tag-filter/output.json'), 'utf-8');

test('Test splitCommitByTag', () => {
  expect(JSON.stringify(splitCommitByTag(commits, setting), null, 2)).toBe(output);
});

test('Test splitCommitByTag without tagFilter', () => {
  expect(JSON.stringify(splitCommitByTag(commits, settingWithoutTagFilter), null, 2)).toBe(outputWithoutTagFilter);
});
