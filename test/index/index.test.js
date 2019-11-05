/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const picklog = require('../../index');

const output = fs.readFileSync(path.resolve(__dirname, 'output.md'), 'utf-8');

test('Test index.js', () => new Promise((resolve) => {
  picklog({
    gitLogArgs: 'v1.2.3',
  }).then((text) => {
    expect(text).toBe(output);
    resolve();
  });
}));
