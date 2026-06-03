const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const calculatorPath = path.join(__dirname, 'calculator.js');

const runCalculator = (...args) =>
  spawnSync('node', [calculatorPath, ...args], { encoding: 'utf8' });

test('modulo works for valid numbers', () => {
  const result = runCalculator('modulo', '10', '3');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /10 % 3 = 1/);
});

test('exponentiation works for valid numbers', () => {
  const result = runCalculator('exponentiation', '2', '5');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /2 \*\* 5 = 32/);
});

test('sqrt works for valid numbers', () => {
  const result = runCalculator('sqrt', '16');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /sqrt 16 = 4/);
});

test('modulo by zero returns error', () => {
  const result = runCalculator('modulo', '10', '0');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Modulo by zero is not allowed\./);
});

test('sqrt of negative number returns error', () => {
  const result = runCalculator('sqrt', '-9');
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Square root of a negative number is not allowed\./);
});
