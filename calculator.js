/**
 * Simple Node.js CLI Calculator
 * 
 * Usage: node calculator.js <operation> <num1> <num2>
 * Operations: add, subtract, multiply, divide
 */

const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
  process.exit(1);
}

const [operation, num1Str, num2Str] = args;
const num1 = parseFloat(num1Str);
const num2 = parseFloat(num2Str);

if (isNaN(num1) || isNaN(num2)) {
  console.error('Error: Please provide valid numbers.');
  process.exit(1);
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
  if (b === 0) {
    console.error('Error: Division by zero is not allowed.');
    process.exit(1);
  }
  return a / b;
};

let result;

switch (operation.toLowerCase()) {
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
  default:
    console.error(`Error: Unknown operation "${operation}".`);
    console.log('Available operations: add, subtract, multiply, divide');
    process.exit(1);
}

console.log(`${num1} ${operation} ${num2} = ${result}`);
