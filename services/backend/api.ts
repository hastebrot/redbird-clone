import { Fmt, Json, Parse, throwError } from "../../libraries/helper/mod.ts";
import { DocumentStoreClient } from "./client.ts";
import {
  ReadDocumentsRequest,
  ReadDocumentsResponse,
  WriteDocumentRequest,
  WriteDocumentResponse,
} from "./model.ts";
import { Context } from "./types.ts";

export const apiHandler = async (ctx: Context, req: Request): Promise<Response> => {
  const start = performance.now();
  const url = new URL(req.url);
  const clientContext = transformToClientContext(ctx, req.headers);

  if (req.method === "POST" && url.pathname === "/write-document") {
    const input = Parse.zod(WriteDocumentRequest, await req.json());
    const output = Parse.zod(
      WriteDocumentResponse,
      await DocumentStoreClient.writeDocument(clientContext, input)
    );
    const time = Fmt.millis(performance.now() - start);
    const size = Fmt.bytes(Json.write(output).length);
    return new Response(Json.write({ ...output, time, size }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }

  if (req.method === "POST" && url.pathname === "/read-documents") {
    const input = Parse.zod(ReadDocumentsRequest, await req.json());
    const output = Parse.zod(
      ReadDocumentsResponse,
      await DocumentStoreClient.readDocuments(clientContext, input)
    );
    const time = Fmt.millis(performance.now() - start);
    const size = Fmt.bytes(Json.write(output).length);
    return new Response(Json.write({ ...output, time, size }), {
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
    workspace: headers.get("x-workspace") ?? throwError(`x-workspace header is missing"`),
  };
};
