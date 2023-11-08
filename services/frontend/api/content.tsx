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
    <div class="flex flex-col h-full">
      <section class="px-4 py-2 border-b border-zinc-200">
        <div class="flex flex-row justify-between gap-1">
          <div class="flex flex-row">
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                Open
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 bg-zinc-200 hover:bg-slate-300">
                Open (Copy)
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                Closed
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                All
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                <PlusIcon />
              </div>
            </button>
          </div>
          <div class="flex flex-row items-center gap-2">
            <input
              class="h-8 min-w-[100px] max-w-[160px] rounded-lg border border-slate-300 px-2 text-sm hover:bg-gray-50"
              placeholder="Search..."
            />
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md text-slate-500 border border-zinc-200 px-2 text-sm leading-[18px] hover:bg-gray-50 disabled:opacity-50">
              <DownloadIcon />
              <span class="truncate">Import</span>
            </button>
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md bg-blue-600 px-2 text-sm leading-[18px] text-white hover:bg-blue-700 disabled:opacity-50">
              <PlusIcon />
              <span class="truncate">New Entry</span>
            </button>
          </div>
        </div>
      </section>

      <section class="py-2 pl-2 pr-4 border-b border-zinc-200">
        <div class="flex flex-row h-8 justify-between gap-1">
          <div class="flex flex-row items-center gap-1">
            <div class="px-2 text-sm leading-[18px] text-slate-500">4 items</div>
            <div class="h-4 w-px flex-shrink-0 bg-zinc-200"></div>
            <button class="flex items-center justify-center rounded">
              <div class="group flex flex-row h-8 items-center gap-1 rounded-md px-2 text-slate-700 hover:bg-zinc-200 active:bg-slate-300">
                <span class="text-sm leading-[18px]">Group</span>
                <ChevronDownIcon />
              </div>
            </button>
            <div class="h-4 w-px flex-shrink-0 bg-zinc-200"></div>
            <button class="flex items-center justify-center rounded">
              <div class="group flex flex-row h-8 items-center gap-1 rounded-md px-2 text-slate-700 hover:bg-zinc-200 active:bg-slate-300">
                <FilterIcon />
                <span class="text-sm leading-[18px]">Filter</span>
                <div class="flex h-5 w-5 flex-row items-center justify-center overflow-hidden rounded-md text-xs leading-[18px] group-hover:bg-white bg-gray-200 text-gray-800">
                  1
                </div>
                <ChevronDownIcon />
              </div>
            </button>
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md text-blue-600 px-2 text-sm leading-[18px] hover:text-white hover:bg-blue-700 disabled:opacity-50">
              <span class="truncate">Reset</span>
            </button>
          </div>
          <div class="flex flex-row items-center gap-2">
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md text-blue-600 px-2 text-sm leading-[18px] hover:text-white hover:bg-blue-700 disabled:opacity-50">
              <BoxArrowUpIcon />
              <span class="truncate">Update view</span>
            </button>
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md text-blue-600 px-2 text-sm leading-[18px] hover:text-white hover:bg-blue-700 disabled:opacity-50">
              <BoxPlusIcon />
              <span class="truncate">Save as new view</span>
            </button>
          </div>
        </div>
      </section>

      <section class="relative flex-0 h-full overflow-hidden">
        <div class="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-[80px] bg-gradient-to-r from-white/0 to-white/80"></div>
        <TableHeaderRow />
        <TableRow />
        <TableRow />
        <TableRow />
      </section>
    </div>
  );
};

export const TableHeaderRow = () => {
  return (
    <div class="h-10 px-4 flex items-center border-b border-zinc-200 bg-gray-50">
      <div class="w-[250px]">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Title</span>
      </div>
      <div class="w-[150px]">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Description</span>
      </div>
      <div class="w-[150px]">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Description</span>
      </div>
      <div class="w-[200px]">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Author</span>
      </div>
    </div>
  );
};

export const TableRow = () => {
  return (
    <div class="h-10 px-4 flex items-center border-b border-zinc-200">
      <div class="w-[250px] group">
        <span class="whitespace-nowrap pr-4 text-slate-700 cursor-pointer group-hover:underline">
          Lorem ipsum dolor
        </span>
      </div>
      <div class="w-[150px]">
        <div class="flex h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">Label</div>
        </div>
      </div>
      <div class="w-[150px]">
        <div class="flex h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">Label</div>
        </div>
      </div>
      <div class="w-[200px] h-10 group outline-0 hover:bg-gray-100 flex flex-row items-center">
        <div class="flex flex-[1_0_0%] h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">Firstname Lastname</div>
        </div>
        <div class="group-hover:block hidden mx-2">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
};

export const PlusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="h-4 w-4"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
    </svg>
  );
};

export const DownloadIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="h-4 w-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
      ></path>
    </svg>
  );
};

export const ChevronDownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      aria-hidden="true"
      class="h-3 w-3"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
    </svg>
  );
};

export const BoxArrowUpIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.667 8L8 5.333m0 0L5.333 8M8 5.333v5.334M5.2 14h5.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C14 12.48 14 11.92 14 10.8V5.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C12.48 2 11.92 2 10.8 2H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C2 3.52 2 4.08 2 5.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C3.52 14 4.08 14 5.2 14z"
      ></path>
    </svg>
  );
};

export const BoxPlusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8 5.333v5.334M5.333 8h5.334M5.2 14h5.6c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C14 12.48 14 11.92 14 10.8V5.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C12.48 2 11.92 2 10.8 2H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C2 3.52 2 4.08 2 5.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C3.52 14 4.08 14 5.2 14z"
      ></path>
    </svg>
  );
};

export const FilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      class=""
    >
      <path
        d="M4 8H12M2 4H14M6 12H10"
        stroke="#30374F"
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
