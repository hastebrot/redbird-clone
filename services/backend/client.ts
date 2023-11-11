import { Document } from "./model.ts";
import { ClientContext } from "./types.ts";

export const DocumentStoreClient = {
  async writeDocument(ctx: ClientContext, params: Record<string, unknown>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const document = transformToDocument(params);
    await ctx.kv.set({
      key: [...workspaceKey, "documents", document.id!],
      val: document,
    });
    if (document.authorId) {
      await ctx.kv.set({
        key: [...workspaceKey, "documents", document.id!, "ref-author"],
        ref: [...workspaceKey, "documents", "by-author", document.authorId, document.id!],
        val: document,
      });
    } else {
      await ctx.kv.delete({
        key: [...workspaceKey, "documents", document.id!, "ref-author"],
      });
    }
    return { ok: true, id: document.id! };
  },

  async readDocuments(ctx: ClientContext, params: Record<string, unknown>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const kvEntries = await ctx.kv.listRef<Document>({
      prefixRef: [...workspaceKey, "documents", "by-author", params.authorId as string],
      limitBy: 100,
    });
    const documents = [];
    for (const kvEntry of kvEntries) {
      documents.push(Document.parse(kvEntry.val));
    }
    return {
      ok: true,
      result: { documents: documents },
      count: { documents: documents.length },
    };
  },
};

const toWorkspaceKey = (ctx: ClientContext): string[] => {
  return [`workspace-${ctx.workspace}`];
};

const transformToDocument = (record: Record<string, unknown>): Document => {
  const now = new Date();
  return Document.parse({
    ...record,
    created: record.created ?? now.toISOString(),
    lastModified: now.toISOString(),
  });
};
