#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * Supports four basic arithmetic operations:
 * - Addition: Adds two or more numbers
 * - Subtraction: Subtracts numbers from the first number
 * - Multiplication: Multiplies two or more numbers
 * - Division: Divides the first number by subsequent numbers
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
}

// CLI Interface
function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Calculator CLI - Basic Arithmetic Operations');
    console.log('\nUsage: node calculator.js <operation> <number1> <number2> [number3] ...');
    console.log('\nOperations:');
    console.log('  add        - Addition');
    console.log('  subtract   - Subtraction');
    console.log('  multiply   - Multiplication');
    console.log('  divide     - Division');
    console.log('\nExamples:');
    console.log('  node calculator.js add 5 3');
    console.log('  node calculator.js subtract 10 4');
    console.log('  node calculator.js multiply 6 7');
    console.log('  node calculator.js divide 20 4');
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
      default:
        console.error(`Error: Unknown operation '${operation}'`);
        console.log("Supported operations: add, subtract, multiply, divide");
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
