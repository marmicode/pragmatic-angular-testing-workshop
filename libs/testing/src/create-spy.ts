import type { Mock } from 'vitest';

/* Using jest.Mock as a return type instead of MockedFunction
 * because vitest implements [Symbol.dispose] but not jest.
 * We downgrade to Jest API. */
export function createSpy<PARAMS extends unknown[], RETURN>(): Mock<
  (...args: PARAMS) => RETURN
> {
  const g = globalThis as unknown as { vi: typeof vi };
  return typeof jest !== 'undefined'
    ? (jest.fn() as unknown as Mock<(...args: PARAMS) => RETURN>)
    : g.vi.fn();
}

declare global {
  const jest: {
    fn: () => Mock<(...args: unknown[]) => unknown>;
  };
}
