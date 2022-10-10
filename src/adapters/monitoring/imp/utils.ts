/* eslint-disable no-restricted-syntax */
const primitiveTypesWithoutNumber = ['string', 'boolean', 'symbol', 'undefined'];
const numberTypes = ['number', 'bigint'];

function isPrimitiveValue(data: unknown): data is string | boolean | null | undefined {
  return primitiveTypesWithoutNumber.includes(typeof data) || data === null;
}

function isNumber(data: unknown): data is number | bigint {
  return numberTypes.includes(typeof data);
}

function isFunction(data: unknown): data is Function {
  return typeof data === 'function';
}

function isObjectAndNotNull(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null;
}

function clearDependencyCycleByMaxDeep(
  data: unknown,
  maxDeep: number
): string | number | Record<string, unknown> | Array<unknown> {
  if (isNumber(data)) return Number(data);
  if (isPrimitiveValue(data) || isFunction(data)) return String(data);

  if (Array.isArray(data))
    return data.map(item => clearDependencyCycleByMaxDeep(item, maxDeep));

  if (isObjectAndNotNull(data)) {
    if (maxDeep <= 0) return '[object]';

    const keys = Object.keys(data);
    const result: Record<string, unknown> = {};
    for (const key of keys) {
      result[key] = clearDependencyCycleByMaxDeep(data[key], maxDeep - 1);
    }
    return result;
  }
  return '';
}

export function stringifyObject(data: unknown, maxDeep: number) {
  const result = clearDependencyCycleByMaxDeep(data, maxDeep);

  if (typeof result === 'string' || isNumber(result)) return result;

  return JSON.stringify(result);
}

export const MonitoringUtils = {
  stringifyObject,
};
