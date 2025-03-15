export default function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 0
): ((...args: Parameters<T>) => void) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
} {
  let timeoutID: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: any[] | null = null;
  let lastThis: any = null;

  // The debounced function
  function debounced(this: any, ...args: any[]): void {
    lastThis = this;
    lastArgs = args;

    clearTimeout(timeoutID ?? undefined);

    timeoutID = setTimeout(() => {
      timeoutID = null;
      func.apply(lastThis, lastArgs as any[]);
    }, wait);
  }

  // Cancel method
  debounced.cancel = function (): void {
    clearTimeout(timeoutID ?? undefined);
    timeoutID = null;
    lastArgs = null;
    lastThis = null;
  };

  // Flush method
  debounced.flush = function (): ReturnType<T> | undefined {
    if (timeoutID !== null && lastArgs !== null) {
      clearTimeout(timeoutID);
      timeoutID = null;
      return func.apply(lastThis, lastArgs);
    }
    return undefined;
  };

  return debounced as ((...args: Parameters<T>) => void) & {
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
  };
}
