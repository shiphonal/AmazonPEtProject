import price from '../../../scripts/utils/price.js';

describe('test suite: price', () => {
    it('convert cents into dollars', () => {
        expect(price(2095)).toEqual('20.95');
    });

    it('work with zero', () => {
        expect(price(0)).toEqual('0.00');
    });

    it('round up to the nearest cent', () => {
        expect(price(2000.5)).toEqual('20.01');
    });

    it('round down to the nearest cent', () => {
        expect(price(2000.4)).toEqual('20.00');
    });

});

