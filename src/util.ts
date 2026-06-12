// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (obj: unknown): obj is Function =>
  typeof obj === 'function'
