import { ZodError, ZodType, ZodTypeDef } from "npm:zod@3.22.4";
import { Log } from "./log.ts";

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
