// This is an exact copy of https://github.com/substack/deep-freeze
// This little app hasn't been updated in 7 years, so babel/typescript
// can't import it using es6

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
};

function _deepFreeze<T>(a: T[]): ReadonlyArray<DeepReadonly<T>>;
function _deepFreeze<T extends Function>(f: T): T;
function _deepFreeze<T>(o: T): DeepReadonly<T>;
function _deepFreeze(o: any) {
  Object.freeze(o);

  Object.getOwnPropertyNames(o).forEach(function (prop) {
    if (o.hasOwnProperty(prop)
      && o[prop] !== null
      && (typeof o[prop] === "object" || typeof o[prop] === "function")
      && !Object.isFrozen(o[prop])) {
      _deepFreeze(o[prop]);
    }
  });

  return o;
};

export const deepfreeze = _deepFreeze;