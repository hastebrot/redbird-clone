import { ZodError, ZodType, ZodTypeDef } from "npm:zod@3.22.4";

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

export const Parse = {
  // TODO(benjamin): find a better way to describe which type failed to parse.
  zod<T>(schema: ZodType<T, ZodTypeDef, T>, value: unknown): T {
    try {
      return schema.parse(value);
    } catch (error: unknown) {
      let cause = error;
      if (error instanceof ZodError) {
        cause = error.message;
      }
      Log.debug("zod value:", value);
      throw new Error(schema.description, { cause });
    }
  },
};
