/** @jsx createElement */
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { createElement } from "npm:preact@10.18.1";
import { Context } from "../types.ts";

// deno-lint-ignore require-await
export const handleGetNavigation = async (_ctx: Context, _req: Request): Promise<Response> => {
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
    <div class="w-[280px] h-full flex border-r border-zinc-200 bg-gray-50">
      <div class="w-full flex flex-col">
        <hr class="mt-8 w-full h-px border-t border-zinc-200"></hr>
        <div class="p-4">
          <button class="flex items-center h-8 gap-3 w-full rounded-md border border-slate-300 bg-white pl-3 pr-2 text-slate-400">
            <SearchIcon />
            <span class="text-sm">Search...</span>
          </button>
        </div>
        <div class="flex flex-col w-full gap-1 px-4">
          <ul class="list-none p-0">
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 hover:bg-zinc-100">
              <SearchIcon />
              <span class="text-sm flex-1">California</span>
            </li>
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 bg-zinc-200 hover:bg-zinc-100">
              <SearchIcon />
              <span class="text-sm flex-1">Washington</span>
            </li>
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 hover:bg-zinc-100">
              <SearchIcon />
              <span class="text-sm flex-1">Massachusetts</span>
            </li>
            <li class="flex flex-row h-8 cursor-pointer items-center gap-3 rounded-md pl-3 pr-2 text-slate-700 hover:bg-zinc-100">
              <SearchIcon />
              <span class="text-sm flex-1">Rhode Island</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="h-4 w-4 text-slate-700"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      ></path>
    </svg>
  );
};
