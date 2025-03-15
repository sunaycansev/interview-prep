export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

export default function classNames(...args: Array<ClassValue>): string {
  const classes: Array<string> = [];

  args.forEach((arg) => {
    // ignore falsy values.
    if (!arg) {
      return;
    }

    const argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(String(arg));
      return;
    }

    if (Array.isArray(arg)) {
      // recursively call classNames with the array elements as arguments
      classes.push(classNames(...arg));
      return;
    }

    if (argType === "object") {
      const objArg = arg as ClassDictionary;
      for (const key in objArg) {
        if (Object.hasOwn(objArg, key) && objArg[key]) {
          classes.push(key);
        }
      }

      return;
    }
  });

  return classes.join(" ");
}
