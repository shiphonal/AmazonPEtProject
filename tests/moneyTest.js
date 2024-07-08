import price from '../scripts/utils/price.js';

console.log('tests with price:');
if (price(2095) === '20.95') {
    console.log('2095 passed');
} else {
    console.log('2095 failed');
}

if (price(0) === '0.00') {
    console.log('0 passed');
} else {
    console.log('0 failed');
}

if (price(2000.5) === '20.01') {
    console.log('2000.5 passed');
} else {
    console.log('2000.5 failed');
}

if (price(2000.4) === '20.00') {
    console.log('2000.4 passed');
} else {
    console.log('2000.4 failed');
}

/*
(code work with ...) we may change to (it ...)
 */
