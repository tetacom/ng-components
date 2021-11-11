import { PrependZeroPipe } from './prepend-zero.pipe';

describe('PrependZeroPipe', () => {
  it('create an instance', () => {
    const pipe = new PrependZeroPipe();
    expect(pipe).toBeTruthy();
  });
});
