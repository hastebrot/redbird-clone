/** @jsx createElement */
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { Fragment, createElement } from "npm:preact@10.18.1";
import { Log } from "../helper.ts";

type Context = Record<string, unknown>;

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
type LayoutProps = {};

const Layout = ({}: LayoutProps) => {
  return (
    <Fragment>
      <div class="p-4 font-sans text-[15px] leading-[20px]">
        <div class="text-3xl text-red-500 font-semibold">redbird</div>
      </div>
    </Fragment>
  );
};
