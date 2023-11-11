import { z, type ZodType } from "npm:zod@3.22.4";

const describe = <T extends ZodType>(description: string, schema: T): T => {
  return schema.describe(description);
};

// ENDPOINT MESSAGES.

export const WriteDocumentRequest = describe(
  "WriteDocumentRequest",
  z.lazy(() => Document)
);

export const WriteDocumentResponse = describe(
  "WriteDocumentResponse",
  z.object({
    ok: z.boolean(),
    id: z.string(),
  })
);

export const ReadDocumentsRequest = describe(
  "ReadDocumentsRequest",
  z.object({
    authorId: z.string(),
  })
);

export const ReadDocumentsResponse = describe(
  "ReadDocumentsResponse",
  z.object({
    ok: z.boolean(),
    result: z.object({
      documents: z.array(z.lazy(() => Document)),
    }),
    count: z.object({
      documents: z.number(),
    }),
  })
);

// MESSAGES.

export type Document = z.infer<typeof Document>;
export const Document = z.object({
  id: z.string().optional(),
  authorId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  authorName: z.string().optional(),
  created: z.string().optional(),
  lastModified: z.string().optional(),
});
