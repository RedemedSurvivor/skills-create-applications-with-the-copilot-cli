/**
 * Simple Node.js CLI Calculator
 * 
 * Usage:
 *   node calculator.js <operation> <num1> <num2>
 *   node calculator.js sqrt <num>
 * Operations: add, subtract, multiply, divide, modulo, exponentiation, sqrt
 */

const args = process.argv.slice(2);
const operation = args[0]?.toLowerCase();
const isSqrt = operation === 'sqrt';

if ((!isSqrt && args.length !== 3) || (isSqrt && args.length !== 2)) {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Usage: node calculator.js sqrt <num>');
  console.log('Operations: add, subtract, multiply, divide, modulo, exponentiation, sqrt');
  process.exit(1);
}

const [_, num1Str, num2Str] = args;
const num1 = parseFloat(num1Str);
const num2 = parseFloat(num2Str);

if (isNaN(num1) || (!isSqrt && isNaN(num2))) {
  console.error('Error: Please provide valid numbers.');
  process.exit(1);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
};
const modulo = (a, b) => {
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
};
const exponentiation = (a, b) => a ** b;
const squareRoot = (a) => {
  if (a < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(a);
};

let result;

try {
  switch (operation) {
    case 'add':
      result = add(num1, num2);
      break;
    case 'subtract':
      result = subtract(num1, num2);
      break;
    case 'multiply':
      result = multiply(num1, num2);
      break;
    case 'divide':
      result = divide(num1, num2);
      break;
    case 'modulo':
      result = modulo(num1, num2);
      break;
    case 'exponentiation':
      result = exponentiation(num1, num2);
      break;
    case 'sqrt':
      result = squareRoot(num1);
      break;
    default:
      console.error(`Error: Unknown operation "${operation}".`);
      console.log('Available operations: add, subtract, multiply, divide, modulo, exponentiation, sqrt');
      process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

if (operation === 'sqrt') {
  console.log(`sqrt ${num1} = ${result}`);
} else {
  console.log(`${num1} ${operation} ${num2} = ${result}`);
}
