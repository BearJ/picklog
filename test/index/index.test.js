/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');

const picklog = require('../../index');

const output = fs.readFileSync(path.resolve(__dirname, 'output.md'), 'utf-8');

test('Test picklog with array', () => {
  picklog(['v0.3.2'])
    .then((text) => {
      expect(text).toBe(output);
    });
});


test('Test picklog with string', () => {
  picklog('v0.3.2')
    .then((text) => {
      expect(text).toBe(output);
    });
});
