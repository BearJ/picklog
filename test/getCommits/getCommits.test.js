/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const getCommits = require('../../lib/getCommits.js');
const setting = require('./.picklogrc');

const output = fs.readFileSync(path.resolve(__dirname, 'output.json'), 'utf-8');

test('Test getCommits', () => {
  getCommits(['v0.3.2'], setting)
    .then((commits) => {
      expect(setting.parse(commits)).toBe(output);
    });
});
