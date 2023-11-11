/** @jsx createElement */
import Lucide from "npm:lucide-preact@0.292.0";
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { createElement } from "npm:preact@10.18.1";
import { Log } from "../../../libraries/helper/mod.ts";
import { Context } from "../types.ts";

// deno-lint-ignore require-await
export const handleGetNavigation = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  Log.debug({ url: url.toString(), ctx });

  const html = renderToString(<Navigation />);
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

// deno-lint-ignore ban-types
export type NavigationProps = {};

export const Navigation = ({}: NavigationProps) => {
  return (
    <div class="w-[260px] h-full flex flex-col justify-between border-r border-zinc-200 bg-gray-50">
      <div class="w-full flex flex-col">
        <hr class="mt-12 w-full h-px border-t border-zinc-200"></hr>
        <div class="p-4">
          <button class="flex items-center h-8 gap-3 w-full rounded-md border border-slate-300 bg-white pl-3 pr-2 text-slate-400">
            <SearchIcon />
            <span class="text-sm">Search...</span>
            <div class="ml-auto">
              <div class="w-fit">
                <div class="flex h-fit w-full select-none flex-row items-center gap-1 rounded-[6px] py-[3.5px] text-center font-normal px-1 text-xs text-gray-500 bg-gray-100">
                  <div class="w-fit truncate">⌘K</div>
                </div>
              </div>
            </div>
          </button>
        </div>
        <div class="w-full px-4">
          <ul class="list-none p-0 flex flex-col gap-1">
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 hover:bg-zinc-100">
              <MagicIcon />
              <span class="text-sm flex-1">Dashboard</span>
            </li>
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 bg-zinc-200 hover:bg-zinc-100">
              <MagicIcon />
              <span class="text-sm flex-1">Documents</span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <FreeTrialWell />
        <hr class="mb-12 mt-4 w-full h-px border-t border-zinc-200"></hr>
      </div>
    </div>
  );
};

const FreeTrialWell = () => {
  return (
    <div class="hidden px-4">
      <div
        class="flex flex-col gap-4 rounded-lg bg-white p-4"
        style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 2px 0px, rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 1px 0px 0px;"
      >
        <div>
          <div class="text-sm text-slate-700">
            <span class="font-semibold">Free Trial </span>
            <span>(Starter plan)</span>
          </div>
          <div class="mt-2 text-xs text-slate-500">29 days remaining</div>
          <div class="mt-2">
            <ol role="list" class="list-none space-y-4 md:flex md:space-x-[2px] md:space-y-0">
              <li style="width: 3.33333%;">
                <div class="group flex flex-col border-t-4 md:border-l-0 md:pb-0 border-slate-700"></div>
              </li>
              <li style="width: 96.6667%;">
                <div class="group flex flex-col border-t-4 border-zinc-200 md:border-l-0 md:pb-0"></div>
              </li>
            </ol>
          </div>
        </div>
        <div class="flex flex-row items-center gap-2">
          <button class="h-8 flex-1 truncate rounded-md border border-slate-300 px-2 text-sm leading-[18px] text-slate-700 hover:border-zinc-200 hover:bg-zinc-200 hover:text-gray-900 active:border-graycool-300 active:bg-slate-300 active:text-gray-900">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

const SearchIcon = () => {
  return <Lucide.Search size={16} strokeWidth={1.6} class="w-4 h-4 text-slate-700" />;
};

const MagicIcon = () => {
  return <Lucide.Sparkles size={16} strokeWidth={1.6} class="w-4 h-4 flex-shrink-0" />;
};
