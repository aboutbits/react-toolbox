// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (obj: unknown): obj is Function =>
  typeof obj === 'function'
