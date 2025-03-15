interface Array<T> {
  myReduce<U>(
    callbackFn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue?: U
  ): U;
}

Array.prototype.myReduce = function (callbackFn, initialValue) {
  const noInitialValue = initialValue === undefined;
  const len = this.length;

  if (
    typeof callbackFn !== "function" ||
    !callbackFn.call ||
    !callbackFn.apply
  ) {
    throw new TypeError(`${callbackFn} is not a function`);
  }

  if (noInitialValue && len === 0) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let acc = noInitialValue ? this[0] : initialValue;
  const indexToStart = noInitialValue ? 1 : 0;

  for (let k = indexToStart; k < len; k++) {
    if (Object.hasOwn(this, k)) {
      acc = callbackFn(acc, this[k], k, this);
    }
  }

  return acc;
};
