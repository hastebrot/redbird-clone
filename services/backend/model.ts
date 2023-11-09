import { type ZodType, z } from "npm:zod@3.22.4";

const describe = <T extends ZodType>(description: string, schema: T): T => {
  return schema.describe(description);
};

// ENDPOINT MESSAGES.

export const WriteEntryRequest = describe(
  "WriteEntryRequest",
  z.lazy(() => Entry)
);

export const WriteEntryResponse = describe(
  "WriteEntryResponse",
  z.object({
    ok: z.boolean(),
    id: z.string(),
  })
);

export const ReadEntriesRequest = describe(
  "ReadEntriesRequest",
  z.object({
    authorId: z.string(),
  })
);

export const ReadEntriesResponse = describe(
  "ReadEntriesResponse",
  z.object({
    ok: z.boolean(),
    result: z.object({
      entries: z.array(z.lazy(() => Entry)),
    }),
    count: z.object({
      entries: z.number(),
    }),
  })
);

// MESSAGES.

export type Entry = z.infer<typeof Entry>;
export const Entry = z.object({
  id: z.string().optional(),
  authorId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  created: z.string().optional(),
  lastModified: z.string().optional(),
});
