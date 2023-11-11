import { Json } from "../../libraries/helper/mod.ts";

const backendAddr = "localhost:4041";
const requestHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-transform",
  "X-Workspace": "test",
};

// TODO(benjamin): introduce context object that contains workspace parameter.
export const DocumentClient = {
  async readDocuments(authorId: string) {
    const url = new URL(`http://${backendAddr}/read-documents`);
    const res = await fetch(url, {
      method: "POST",
      body: Json.write({ authorId }),
      headers: requestHeaders,
    });
    return await res.json();
  },
};
