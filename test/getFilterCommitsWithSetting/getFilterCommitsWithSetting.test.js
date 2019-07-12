/* eslint-disable no-undef */

const { readFileSync } = require('fs');
const { resolve } = require('path');

const getFilterCommitsWithSetting = require('../../src/getFilterCommitsWithSetting.js');
const input = require('./input');
const setting = require('../.picklogrc');

const output = readFileSync(resolve(__dirname, 'output.json'), 'utf-8');

test('Test getFilterCommitsWithSetting', () => {
  /* eslint-disable-next-line no-extend-native */
  RegExp.prototype.toJSON = RegExp.prototype.toString; // JSON.stringify会调用正则表达式的toJSON

  expect(JSON.stringify(getFilterCommitsWithSetting(input, setting), null, 2)).toBe(output);
});
