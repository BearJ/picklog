/* eslint-disable no-undef */

const { readFileSync } = require('fs');
const { resolve } = require('path');

const getCommits = require('../../src/getCommits.js');
const setting = require('../.picklogrc');

const output = readFileSync(resolve(__dirname, 'output.json'), 'utf-8');
const outputWithLatest = readFileSync(resolve(__dirname, 'outputWithLatest.json'), 'utf-8');

test('Test getCommits.js', () => {
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
    });
});

test('Test getCommits.js with arg "latest"', () => {
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
    });
});
