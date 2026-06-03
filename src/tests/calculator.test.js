const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  // ============================================
  // ADDITION TESTS
  // ============================================
  describe('add()', () => {
    // Basic test from image: 2 + 3 = 5
    test('should add two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('should add multiple numbers', () => {
      expect(calculator.add(2, 3, 5, 10)).toBe(20);
    });

    test('should handle negative numbers', () => {
      expect(calculator.add(-5, 3)).toBe(-2);
    });

    test('should add negative numbers', () => {
      expect(calculator.add(-5, -3)).toBe(-8);
    });

    test('should handle decimal numbers', () => {
      expect(calculator.add(2.5, 3.5)).toBe(6);
    });

    test('should add zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });

    test('should return 0 with no arguments', () => {
      expect(calculator.add()).toBe(0);
    });

    test('should add single number', () => {
      expect(calculator.add(42)).toBe(42);
    });

    test('should handle very large numbers', () => {
      expect(calculator.add(1000000, 2000000)).toBe(3000000);
    });
  });

  // ============================================
  // SUBTRACTION TESTS
  // ============================================
  describe('subtract()', () => {
    // Basic test from image: 10 - 4 = 6
    test('should subtract two positive numbers', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('should subtract multiple numbers sequentially', () => {
      expect(calculator.subtract(20, 5, 3)).toBe(12);
    });

    test('should handle negative result', () => {
      expect(calculator.subtract(5, 10)).toBe(-5);
    });

    test('should handle subtracting negative numbers', () => {
      expect(calculator.subtract(10, -5)).toBe(15);
    });

    test('should handle decimal numbers', () => {
      expect(calculator.subtract(10.5, 2.3)).toBeCloseTo(8.2);
    });

    test('should subtract zero', () => {
      expect(calculator.subtract(5, 0)).toBe(5);
    });

    test('should return 0 with no arguments', () => {
      expect(calculator.subtract()).toBe(0);
    });

    test('should return single number as-is', () => {
      expect(calculator.subtract(42)).toBe(42);
    });

    test('should handle consecutive subtractions', () => {
      expect(calculator.subtract(100, 25, 25, 25)).toBe(25);
    });
  });

  // ============================================
  // MULTIPLICATION TESTS
  // ============================================
  describe('multiply()', () => {
    // Basic test from image: 45 * 2 = 90
    test('should multiply two positive numbers', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('should multiply multiple numbers', () => {
      expect(calculator.multiply(2, 3, 4)).toBe(24);
    });

    test('should multiply by negative numbers', () => {
      expect(calculator.multiply(5, -3)).toBe(-15);
    });

    test('should multiply two negative numbers', () => {
      expect(calculator.multiply(-5, -3)).toBe(15);
    });

    test('should handle decimal numbers', () => {
      expect(calculator.multiply(2.5, 4)).toBe(10);
    });

    test('should multiply by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    test('should return 1 with no arguments', () => {
      expect(calculator.multiply()).toBe(1);
    });

    test('should multiply single number', () => {
      expect(calculator.multiply(42)).toBe(42);
    });

    test('should handle fractional multiplication', () => {
      expect(calculator.multiply(0.5, 0.5)).toBeCloseTo(0.25);
    });

    test('should multiply multiple decimal numbers', () => {
      expect(calculator.multiply(1.5, 2, 3)).toBe(9);
    });
  });

  // ============================================
  // DIVISION TESTS
  // ============================================
  describe('divide()', () => {
    // Basic test from image: 20 / 5 = 4
    test('should divide two positive numbers', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('should divide multiple numbers sequentially', () => {
      expect(calculator.divide(100, 5, 2)).toBe(10);
    });

    test('should handle division with negative numbers', () => {
      expect(calculator.divide(-20, 5)).toBe(-4);
    });

    test('should handle division of two negative numbers', () => {
      expect(calculator.divide(-20, -5)).toBe(4);
    });

    test('should handle decimal division', () => {
      expect(calculator.divide(10, 4)).toBeCloseTo(2.5);
    });

    test('should return result with single number', () => {
      expect(calculator.divide(42)).toBe(42);
    });

    test('should handle division of decimals', () => {
      expect(calculator.divide(7.5, 2.5)).toBe(3);
    });

    test('should divide zero by a number', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    // ============================================
    // EDGE CASES: DIVISION BY ZERO
    // ============================================
    test('should throw error when dividing by zero (single divisor)', () => {
      expect(() => {
        calculator.divide(20, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing by zero (second divisor in sequence)', () => {
      expect(() => {
        calculator.divide(100, 5, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should throw error when dividing by zero (multiple divisors)', () => {
      expect(() => {
        calculator.divide(100, 0, 5);
      }).toThrow('Division by zero is not allowed');
    });

    test('should throw error when zero divided by zero', () => {
      expect(() => {
        calculator.divide(0, 0);
      }).toThrow('Division by zero is not allowed');
    });

    test('should return 0 with no arguments', () => {
      expect(calculator.divide()).toBe(0);
    });
  });

  // ============================================
  // INTEGRATION TESTS: CHAINING OPERATIONS
  // ============================================
  describe('Integration Tests', () => {
    test('should handle combined arithmetic operations', () => {
      // (2 + 3) * 4 = 20
      const step1 = calculator.add(2, 3);
      const step2 = calculator.multiply(step1, 4);
      expect(step2).toBe(20);
    });

    test('should handle complex calculation sequence', () => {
      // ((100 - 25) * 2) / 5 = 30
      const step1 = calculator.subtract(100, 25);
      const step2 = calculator.multiply(step1, 2);
      const step3 = calculator.divide(step2, 5);
      expect(step3).toBe(30);
    });

    test('should handle all operations from image examples', () => {
      expect(calculator.add(2, 3)).toBe(5);       // Image example
      expect(calculator.subtract(10, 4)).toBe(6);  // Image example
      expect(calculator.multiply(45, 2)).toBe(90); // Image example
      expect(calculator.divide(20, 5)).toBe(4);    // Image example
    });
  });

  // ============================================
  // PRECISION TESTS
  // ============================================
  describe('Precision Tests', () => {
    test('should handle floating point precision for addition', () => {
      expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should handle floating point precision for division', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.3333, 3);
    });

    test('should handle very small decimal numbers', () => {
      expect(calculator.add(0.0001, 0.0002)).toBeCloseTo(0.0003);
    });

    test('should handle large number precision', () => {
      const result = calculator.add(999999999, 1);
      expect(result).toBe(1000000000);
    });
  });
});
