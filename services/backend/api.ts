import { EntryStoreClient } from "./client.ts";
import { Json, Parse, throwError } from "./helper.ts";
import {
  ReadEntriesRequest,
  ReadEntriesResponse,
  WriteEntryRequest,
  WriteEntryResponse,
} from "./model.ts";
import { Context } from "./types.ts";

export const apiHandler = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const clientContext = transformToClientContext(ctx, req.headers);

  if (req.method === "POST" && url.pathname === "/write-entry") {
    const input = Parse.zod(WriteEntryRequest, await req.json());
    const output = Parse.zod(
      WriteEntryResponse,
      await EntryStoreClient.writeEntry(clientContext, input)
    );
    return new Response(Json.write(output), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  if (req.method === "POST" && url.pathname === "/read-entries") {
    const input = Parse.zod(ReadEntriesRequest, await req.json());
    const output = Parse.zod(
      ReadEntriesResponse,
      await EntryStoreClient.readEntries(clientContext, input)
    );
    return new Response(Json.write(output), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  return new Response(null, { status: 404 });
};

const transformToClientContext = (ctx: Context, headers: Headers) => {
  return {
    kv: ctx.kv,
    workspace: headers.get("X-Workspace") ?? throwError(`X-Workspace is missing"`),
  };
};
