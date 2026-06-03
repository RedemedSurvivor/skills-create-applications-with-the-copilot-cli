#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * Supports arithmetic operations:
 * Basic: Addition, Subtraction, Multiplication, Division
 * Advanced: Modulo, Exponentiation, Square Root
 */

class Calculator {
  /**
   * Addition operation
   * @param {...number} numbers - Numbers to add
   * @returns {number} Sum of all numbers
   */
  add(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
  }

  /**
   * Subtraction operation
   * @param {...number} numbers - First number minus subsequent numbers
   * @returns {number} Result of subtraction
   */
  subtract(...numbers) {
    if (numbers.length === 0) return 0;
    return numbers.reduce((result, num) => result - num);
  }

  /**
   * Multiplication operation
   * @param {...number} numbers - Numbers to multiply
   * @returns {number} Product of all numbers
   */
  multiply(...numbers) {
    return numbers.reduce((product, num) => product * num, 1);
  }

  /**
   * Division operation
   * @param {...number} numbers - First number divided by subsequent numbers
   * @returns {number} Result of division
   * @throws {Error} If dividing by zero
   */
  divide(...numbers) {
    if (numbers.length === 0) return 0;
    
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] === 0) {
        throw new Error('Division by zero is not allowed');
      }
    }
    
    return numbers.reduce((result, num) => result / num);
  }

  /**
   * Modulo operation
   * @param {number} a - The dividend
   * @param {number} b - The divisor
   * @returns {number} The remainder of a divided by b
   * @throws {Error} If dividing by zero
   */
  modulo(a, b) {
    if (b === 0) {
      throw new Error('Modulo by zero is not allowed');
    }
    return a % b;
  }

  /**
   * Exponentiation operation
   * @param {number} base - The base number
   * @param {number} exponent - The exponent
   * @returns {number} The result of base raised to the exponent
   */
  power(base, exponent) {
    return Math.pow(base, exponent);
  }

  /**
   * Square root operation
   * @param {number} n - The number to find the square root of
   * @returns {number} The square root of n
   * @throws {Error} If n is negative
   */
  squareRoot(n) {
    if (n < 0) {
      throw new Error('Cannot calculate square root of a negative number');
    }
    return Math.sqrt(n);
  }
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Calculator CLI - Arithmetic & Advanced Operations');
    console.log('\nUsage: node calculator.js <operation> <number1> <number2> [number3] ...');
    console.log('\nBasic Operations:');
    console.log('  add        - Addition');
    console.log('  subtract   - Subtraction');
    console.log('  multiply   - Multiplication');
    console.log('  divide     - Division');
    console.log('\nAdvanced Operations:');
    console.log('  modulo     - Remainder (a % b)');
    console.log('  power      - Exponentiation (base ^ exponent)');
    console.log('  sqrt       - Square root');
    console.log('\nExamples:');
    console.log('  node calculator.js add 5 3');
    console.log('  node calculator.js divide 20 4');
    console.log('  node calculator.js modulo 10 3');
    console.log('  node calculator.js power 2 8');
    console.log('  node calculator.js sqrt 16');
    process.exit(1);
  }

  const operation = args[0].toLowerCase();
  const numbers = args.slice(1).map(arg => {
    const num = parseFloat(arg);
    if (isNaN(num)) {
      console.error(`Error: '${arg}' is not a valid number`);
      process.exit(1);
    }
    return num;
  });

  const calculator = new Calculator();
  let result;

  try {
    switch (operation) {
      case 'add':
        result = calculator.add(...numbers);
        break;
      case 'subtract':
        result = calculator.subtract(...numbers);
        break;
      case 'multiply':
        result = calculator.multiply(...numbers);
        break;
      case 'divide':
        result = calculator.divide(...numbers);
        break;
      case 'modulo':
        if (numbers.length !== 2) {
          throw new Error('Modulo operation requires exactly 2 arguments');
        }
        result = calculator.modulo(numbers[0], numbers[1]);
        break;
      case 'power':
        if (numbers.length !== 2) {
          throw new Error('Power operation requires exactly 2 arguments');
        }
        result = calculator.power(numbers[0], numbers[1]);
        break;
      case 'sqrt':
        if (numbers.length !== 1) {
          throw new Error('Square root operation requires exactly 1 argument');
        }
        result = calculator.squareRoot(numbers[0]);
        break;
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        console.log("Supported operations: add, subtract, multiply, divide, modulo, power, sqrt");
        process.exit(1);
    }

    console.log(`Result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Export calculator class for testing
module.exports = Calculator;

// Run CLI if this is the main module
if (require.main === module) {
  main();
}
