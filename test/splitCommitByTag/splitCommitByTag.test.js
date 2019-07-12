/* eslint-disable no-undef */

const { readFileSync } = require('fs');
const { resolve } = require('path');

const splitCommitByTag = require('../../src/splitCommitByTag.js');
const commits = require('./input');

const output = readFileSync(resolve(__dirname, 'output.json'), 'utf-8');

test('Test splitCommitByTag', () => {
  expect(JSON.stringify(splitCommitByTag(commits), null, 2)).toBe(output);
});
