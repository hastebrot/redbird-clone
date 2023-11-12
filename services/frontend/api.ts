import { handleGetContent } from "./api/content.tsx";
import { handleGetLayout } from "./api/layout.tsx";
import { handleGetNavigation } from "./api/navigation.tsx";

const serverTimestamp = Date.now();
const indexHtml = Deno.readTextFileSync("public/index.html");
const indexHmrJs = Deno.readTextFileSync("public/index.hmr.js");

export const apiHandler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const ctx = {};

  if (req.method === "GET" && url.pathname === "/") {
    return new Response(indexHtml, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // "cache-control": "no-transform",
        // "content-security-policy": "default-src 'self';",
      },
    });
  }

  if (req.method === "GET" && url.pathname === "/index.hmr.js") {
    return new Response(indexHmrJs, {
      headers: {
        "content-type": "text/javascript; charset=utf-8",
      },
    });
  }

  if (req.method === "GET" && url.pathname === "/hmr") {
    return new Response(`${serverTimestamp}`, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  if (req.method === "GET" && url.pathname === "/layout") {
    return await handleGetLayout(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/navigation") {
    return await handleGetNavigation(ctx, req);
  }

  if (req.method === "GET" && url.pathname === "/content") {
    return await handleGetContent(ctx, req);
  }

  return new Response(null, { status: 404 });
};
