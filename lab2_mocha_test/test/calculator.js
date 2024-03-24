const chai = require('chai');
const expect = chai.expect;
const calculator = require('../app/calculator');

describe('Calculator Tests', function () {
    it('Addition - PASS', function () {
        expect(calculator.add(5, 2)).to.equal(7, 'Addition test failed');
    });

    it('Addition - FAIL', function () {
        expect(calculator.add(5, 2)).to.equal(8, 'Addition test passed incorrectly');
    });

    it('Subtraction - PASS', function () {
        expect(calculator.sub(5, 2)).to.equal(3, 'Subtraction test failed');
    });

    it('Subtraction - FAIL', function () {
        expect(calculator.sub(5, 2)).to.equal(5, 'Subtraction test passed incorrectly');
    });

    it('Multiplication - PASS', function () {
        expect(calculator.mul(5, 2)).to.equal(10, 'Multiplication test failed');
    });

    it('Multiplication - FAIL', function () {
        expect(calculator.mul(5, 2)).to.equal(12, 'Multiplication test passed incorrectly');
    });

    it('Division - PASS', function () {
        expect(calculator.div(10, 2)).to.equal(5, 'Division test failed');
    });

    it('Division - FAIL', function () {
        expect(calculator.div(10, 2)).to.equal(2, 'Division test passed incorrectly');
    });
});
