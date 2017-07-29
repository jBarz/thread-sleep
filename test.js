'use strict';

var assert = require('assert');
var sleep = require('./');

var margin = 100;
if (process.platform === 'os390')
  margin = 150;

try {
  sleep('string');
  throw new Error('sleep with a string should throw an error');
} catch (ex) {
  assert(ex instanceof TypeError);
}
try {
  sleep(-10);
  throw new Error('sleep with a negative number should throw an error');
} catch (ex) {
  assert(ex instanceof RangeError);
}
try {
  sleep(1.5);
  throw new Error('sleep with a non-integer should throw an error');
} catch (ex) {
  assert(ex instanceof TypeError);
}
try {
  sleep(Math.pow(2, 64));
  throw new Error('sleep with a very large integer should throw an error');
} catch (ex) {
  assert(ex instanceof RangeError);
}

var start = Date.now();
var res = sleep(1000);
var end = Date.now();
console.log('Time as returned by sleep():', res);
console.log('Time counted on our own:    ', end - start);
assert(Math.abs(1000 - res) < margin);
assert(Math.abs(1000 - (end - start)) < margin);

console.log('tests passed');
