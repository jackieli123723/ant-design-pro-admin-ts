export function sum(a: number, b: number): number {
  return a + b;
}

describe('sum function tests', (): void => {
  it('1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
