export const throwError = (message: string): never => {
  throw new Error(message);
};

export const Env = {
  stringOrThrow(key: string): string {
    const value = Deno.env.get(key);
    if (value === undefined) {
      throw new Error(`env lookup failed, key='${key}'`);
    }
    return value;
  },

  integerOrThrow(key: string): number {
    const value = Deno.env.get(key);
    if (value === undefined) {
      throw new Error(`env lookup failed, key='${key}'`);
    }
    if (Number.isInteger(Number(value))) {
      return Number(value);
    }
    throw new Error(`env parse of integer failed, key='${key}'`);
  },
};

export const Log = {
  // deno-lint-ignore no-explicit-any
  debug(...data: any[]) {
    console.debug(...data);
  },

  // deno-lint-ignore no-explicit-any
  error(...data: any[]) {
    console.error(...data);
  },
};

export const Json = {
  // deno-lint-ignore no-explicit-any
  write(text: any): string {
    return JSON.stringify(text, null, 2);
  },

  read(text: string): string {
    return JSON.parse(text);
  },
};
