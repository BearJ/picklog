/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const getCommits = require('../../src/getCommits.js');
const setting = require('../.picklogrc');

const output = fs.readFileSync(path.resolve(__dirname, 'output.json'), 'utf-8');
const outputWithLatest = fs.readFileSync(path.resolve(__dirname, 'outputWithLatest.json'), 'utf-8');

test('Test getCommits.js', () => new Promise((resolve) => {
  getCommits({
    gitLogArgs: 'v1.2.3',
  }, setting)
    .then((commits) => {
      commits.forEach((log) => {
        log.commits.forEach((commit) => {
          delete commit.ar;
          delete commit.cr;
        });
        log.results.forEach((result) => {
          result.commits.forEach((commit) => {
            delete commit.ar;
            delete commit.cr;
          });
        });
      });

      /* eslint-disable-next-line no-extend-native */
      RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
      expect(JSON.stringify(commits, null, 2)).toBe(output);
      resolve();
    });
}));

test('Test getCommits.js with arg "latest"', () => new Promise((resolve) => {
  getCommits({
    latest: true,
    gitLogArgs: 'v1.2.3',
  }, setting)
    .then((commits) => {
      commits.forEach((log) => {
        log.commits.forEach((commit) => {
          delete commit.ar;
          delete commit.cr;
        });
        log.results.forEach((result) => {
          result.commits.forEach((commit) => {
            delete commit.ar;
            delete commit.cr;
          });
        });
      });

      /* eslint-disable-next-line no-extend-native */
      RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON
      expect(JSON.stringify(commits, null, 2)).toBe(outputWithLatest);
      resolve();
    });
}));
