/** @jsx createElement */
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { createElement } from "npm:preact@10.18.1";
import { Context } from "../types.ts";

// deno-lint-ignore require-await
export const handleGetContent = async (_ctx: Context, _req: Request): Promise<Response> => {
  const html = renderToString(<Content />);
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

// deno-lint-ignore ban-types
export type ContentProps = {};

export const Content = ({}: ContentProps) => {
  return (
    <section class="flex flex-col h-full">
      <section class="px-4 py-2 flex flex-row items-center border-b border-zinc-200">
        <button class="flex items-center justify-center rounded">
          <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 bg-zinc-200">
            Open
          </div>
        </button>
        <button class="flex items-center justify-center rounded">
          <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700">
            Closed
          </div>
        </button>
        <button class="flex items-center justify-center rounded">
          <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700">
            All
          </div>
        </button>
        <button>+</button>
      </section>
      <section class="py-2 pl-2 pr-4 border-b border-zinc-200">
        <div class="flex flex-row h-8 justify-between gap-1">4 items group filter</div>
      </section>
      <section>
        <div class="h-10 px-4 flex items-center border-b border-zinc-200 bg-gray-50">title description</div>
        <div class="h-10 px-4 flex items-center border-b border-zinc-200">lorem ipsum dolor</div>
        <div class="h-10 px-4 flex items-center border-b border-zinc-200">lorem ipsum dolor</div>
        <div class="h-10 px-4 flex items-center border-b border-zinc-200">lorem ipsum dolor</div>
      </section>
    </section>
  );
};
