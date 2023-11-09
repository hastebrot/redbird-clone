import { Entry } from "./model.ts";
import { ClientContext } from "./types.ts";

export const EntryStoreClient = {
  async writeEntry(ctx: ClientContext, params: Record<string, unknown>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const entry = transformToEntry(params);
    await ctx.kv.set({
      key: [...workspaceKey, "entries", entry.id!],
      val: entry,
    });
    if (entry.authorId) {
      await ctx.kv.set({
        key: [...workspaceKey, "entries", entry.id!, "ref-author"],
        ref: [...workspaceKey, "entries", "by-author", entry.authorId, entry.id!],
        val: entry,
      });
    } else {
      await ctx.kv.delete({
        key: [...workspaceKey, "entries", entry.id!, "ref-author"],
      });
    }
    return { ok: true, id: entry.id! };
  },

  async readEntries(ctx: ClientContext, params: Record<string, unknown>) {
    const workspaceKey = toWorkspaceKey(ctx);
    const entries = await ctx.kv.listRef<Entry>({
      prefixRef: [...workspaceKey, "entries", "by-author", params.authorId as string],
      limitBy: 100,
    });
    const results = [];
    for (const entry of entries) {
      results.push(Entry.parse(entry.val));
    }
    return {
      ok: true,
      result: { entries: results },
      count: { entries: results.length },
    };
  },
};

const toWorkspaceKey = (ctx: ClientContext): string[] => {
  return [`workspace-${ctx.workspace}`];
};

const transformToEntry = (record: Record<string, unknown>): Entry => {
  const now = new Date();
  return Entry.parse({
    ...record,
    created: record.created ?? now.toISOString(),
    lastModified: now.toISOString(),
  });
};
