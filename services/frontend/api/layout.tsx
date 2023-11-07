/** @jsx createElement */
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { Fragment, createElement } from "npm:preact@10.18.1";
import { Log } from "../helper.ts";
import { Context } from "../types.ts";

// deno-lint-ignore require-await
export const handleGetLayout = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  Log.debug({ url: url.toString(), ctx });

  const html = renderToString(<Layout />);
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

// deno-lint-ignore ban-types
export type LayoutProps = {};

export const Layout = ({}: LayoutProps) => {
  return (
    <Fragment>
      <div class="font-sans text-[15px] leading-[20px] min-h-screen grid">
        <div class="flex flex-row">
          <nav hx-get="/navigation" hx-trigger="load" hx-swap="innerHTML"></nav>
          {/* <main class="p-4 text-3xl text-red-500 font-semibold">redbird</main> */}
        </div>
      </div>
    </Fragment>
  );
};
