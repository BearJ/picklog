/* eslint-disable no-undef */

const { readFileSync } = require('fs');
const { resolve } = require('path');

const picklog = require('../../index');

const output = readFileSync(resolve(__dirname, 'output.md'), 'utf-8');

test('Test index.js', () => {
  picklog({
    gitLogArgs: 'v1.2.3',
  }).then((text) => {
    expect(text).toBe(output);
  });
});
