import { throttle } from './throttle.utils';

describe('throttle-utils', () => {
  describe('throttle', () => {
    it('should resolve the promise in the time-frame given ', (done) => {
      const sample = { test: 1 };
      throttle(500).then(() => (sample.test = 2));

      expect(sample.test).toBe(1);
      setTimeout(() => {
        expect(sample.test).toBe(2);
        done();
      }, 501);
    });
  });
});
