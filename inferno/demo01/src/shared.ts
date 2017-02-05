export const isBrowser = typeof window !== undefined && window.document;

export function isFunction(obj: any): boolean {
  return typeof obj === 'function';
}

export function isString(obj: any): boolean {
  return typeof obj === 'string';
}

export function isNumber(obj: any) {
  return typeof obj === 'number';
}