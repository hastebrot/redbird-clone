/** @jsx createElement */
import Lucide from "npm:lucide-preact@0.292.0";
import { renderToString } from "npm:preact-render-to-string@6.2.2";
import { createElement } from "npm:preact@10.18.1";
import { Log } from "../../../libraries/helper/mod.ts";
import { Entry } from "../../backend/model.ts";
import { classNames } from "../helper.ts";
import { Context } from "../types.ts";

const headers = {
  "X-Workspace": "test",
};

export const handleGetContent = async (ctx: Context, req: Request): Promise<Response> => {
  const url = new URL(req.url);
  Log.debug({ url: url.toString(), ctx });

  const res = await fetch("http://localhost:4041/read-entries", {
    method: "POST",
    body: JSON.stringify({ authorId: "id-author" }),
    headers,
  });
  const data = await res.json();

  const html = renderToString(<Content entries={data.result.entries} />);
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

export type ContentProps = {
  entries: Entry[];
};

const TabList = () => {
  return (
    <div
      class="[outline:none] w-full items-center justify-center rounded-lg bg-[#F4F4F5] p-0.5 text-[#71717A] flex _grid _grid-cols-2"
      role="tablist"
      aria-orientation="horizontal"
    >
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm _font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#09090B] data-[state=active]:shadow"
        type="button"
        role="tab"
        data-state="active"
      >
        All (5)
      </button>
      <button
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-2 py-1 text-sm _font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[#FFFFFF] data-[state=active]:text-[#09090B] data-[state=active]:shadow"
        type="button"
        role="tab"
        data-state="inactive"
      >
        Unread (2)
      </button>
    </div>
  );
};

export const Content = (props: ContentProps) => {
  return (
    <div class="flex flex-col h-full">
      <section class="pl-[28px] px-4 pt-3 py-2 border-b border-transparent">
        <div class="flex flex-row justify-between gap-1">
          <div class="flex flex-row items-center">
            <span class="text-lg font-medium text-slate-600 whitespace-nowrap">Pull requests</span>
          </div>
          <div class="invisible flex flex-row">
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncate rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                Open
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncate rounded-md px-4 text-sm leading-[18px] text-slate-700 bg-zinc-200 hover:bg-slate-300">
                <span class="whitespace-nowrap">Open (Copy)</span>
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncate rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                Closed
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncate rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                All
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 gap-1 max-w-[120px] items-center truncated rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                <span class="whitespace-nowrap">1 more</span>
                <ChevronDownIcon />
              </div>
            </button>
            <button class="flex items-center justify-center rounded">
              <div class="flex h-8 max-w-[120px] items-center truncate rounded-md px-4 text-sm leading-[18px] text-slate-700 hover:bg-slate-300">
                <PlusIcon />
              </div>
            </button>
            d
          </div>
          <div class="flex flex-row items-center gap-2">
            <input
              class="h-8 min-w-[100px] max-w-[160px] rounded-lg border border-slate-300 px-2 text-sm hover:bg-gray-50"
              placeholder="Search..."
            />
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md text-slate-500 border border-zinc-200 px-2 text-sm leading-[18px] hover:bg-gray-50 disabled:opacity-50">
              <ImportIcon />
              <span class="truncate">Import</span>
            </button>
            <button class="flex flex-row h-8 items-center gap-1 whitespace-nowrap rounded-md bg-blue-600 px-2 text-sm leading-[18px] text-white hover:bg-blue-700 disabled:opacity-50">
              <PlusIcon />
              <span class="truncate">New pull request</span>
            </button>
          </div>
        </div>
      </section>

      <section class="pl-[28px] px-4 border-b border-zinc-200">
        <div class="flex flex-row justify-between gap-1 -mb-px">
          <div class="flex flex-row gap-6">
            <button class="py-1 flex items-center justify-center border-b-2 border-blue-600">
              <div class="flex h-8 max-w-[120px] items-center truncate font-semibold text-sm leading-[18px] text-slate-700 hover:text-slate-700">
                All pull requests
              </div>
            </button>
            <button class="py-1 flex items-center justify-center border-b-2 border-transparent">
              <div class="flex h-8 max-w-[120px] items-center truncate text-sm leading-[18px] text-slate-500 hover:text-slate-700">
                Open
              </div>
            </button>
            <button class="py-1 flex items-center justify-center border-b-2 border-transparent">
              <div class="flex h-8 max-w-[120px] items-center truncate text-sm leading-[18px] text-slate-500 hover:text-slate-700">
                Closed
              </div>
            </button>
            <button class="py-1 flex items-center justify-center border-b-2 border-transparent">
              <div class="flex h-8 max-w-[120px] items-center truncate text-sm leading-[18px] text-slate-500 hover:text-slate-700">
                <span class="whitespace-nowrap">1 more</span>
                <ChevronDownIcon />
              </div>
            </button>
            <button class="py-1 flex items-center justify-center border-b-2 border-transparent">
              <div class="flex h-8 max-w-[120px] items-center truncate text-sm leading-[18px] text-slate-500 hover:text-slate-700">
                <PlusIcon />
              </div>
            </button>
          </div>
        </div>
      </section>

      <section class="pl-[20px] py-2 pr-4 border-b border-zinc-200">
        <div class="flex flex-row h-8 justify-between gap-1">
          <div class="flex flex-row items-center gap-1">
            <div class="flex whitespace-nowrap">
              <TabList />
            </div>
            <div class="hidden px-2 text-sm leading-[18px] text-slate-500">5 items</div>
            <div class="hidden h-4 w-px flex-shrink-0 bg-zinc-200"></div>
            <button class="hidden _flex items-center justify-center rounded">
              <div class="group flex flex-row h-8 items-center gap-1 rounded-md px-2 text-slate-700 hover:bg-zinc-200 active:bg-slate-300">
                <span class="text-sm leading-[18px]">Group</span>
                <ChevronDownIcon />
              </div>
            </button>
            <div class="hidden h-4 w-px flex-shrink-0 bg-zinc-200"></div>
            <button class="flex items-center justify-center rounded" type="button">
              <div class="group flex h-8 flex-row items-center gap-1 rounded-md px-2 text-slate-700 hover:bg-zinc-200 active:bg-slate-300">
                <div class="text-sm leading-[18px]">Group</div>
                <div class="flex h-6 flex-row items-center justify-center overflow-hidden rounded-md px-2 text-sm leading-[18px] group-hover:bg-white bg-blue-200 text-blue-800">
                  <span class="whitespace-nowrap">Label</span>
                </div>
                <ChevronDownIcon />
              </div>
            </button>
            <div class="hidden h-4 w-px flex-shrink-0 bg-zinc-200"></div>
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
        {props.entries.map((entry, index) => {
          return <TableRow entry={entry} index={index} />;
        })}
      </section>
    </div>
  );
};

export const TableHeaderRow = () => {
  return (
    <div class="h-10 flex border-b border-zinc-200 bg-gray-50">
      <div class="w-[12px] flex items-center justify-center"></div>
      <div class="w-[260px] flex items-center px-4 hover:bg-gray-100 cursor-pointer">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Title</span>
      </div>
      <div class="w-[120px] flex items-center px-4 hover:bg-gray-100 cursor-pointer">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Description</span>
      </div>
      <div class="w-[120px] flex items-center px-4 hover:bg-gray-100 cursor-pointer">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Description</span>
      </div>
      <div class="w-[200px] flex items-center px-4 hover:bg-gray-100 cursor-pointer">
        <span class="whitespace-nowrap pr-4 text-xs text-slate-600">Author</span>
      </div>
    </div>
  );
};

export const TableRow = (props: { entry: Entry; index: number }) => {
  return (
    <div class="relative h-10 flex border-b border-zinc-200">
      <div
        class={classNames(
          props.index % 2 && "invisible",
          "-z-10 w-[285px] absolute inset-y-0 left-0 flex"
        )}
      >
        <div class="w-full block bg-gradient-to-r from-indigo-50 _via-[#efeeff] to-white"></div>
      </div>
      <div class={classNames(props.index % 2 && "invisible", "w-[12px] pl-2.5 flex items-center")}>
        <div class="flex-shrink-0 rounded-full w-[8px] h-[8px] bg-blue-600"></div>
      </div>
      <div class="w-[260px] group relative flex items-center px-4">
        <span class="whitespace-nowrap pr-4 text-slate-700 cursor-pointer group-hover:underline">
          {props.entry.title}
        </span>
        <TableCellActions />
      </div>
      <div class="w-[120px] flex items-center px-4">
        <div class="flex h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">Label</div>
        </div>
      </div>
      <div class="w-[120px] flex items-center px-4">
        <div class="flex h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">{props.entry.created}</div>
        </div>
      </div>
      <div class="w-[200px] group relative px-4 outline-0 hover:bg-gray-100 flex flex-row items-center">
        <div class="flex flex-[1_0_0%] h-6 w-fit max-w-full cursor-default flex-row items-center gap-1 rounded-md border border-slate-300 px-2">
          <div class="truncate text-sm leading-[18px] text-slate-700">{props.entry.authorId}</div>
        </div>
        <div class="group-hover:block hidden mx-2">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
};

export const TableCellActions = () => {
  return (
    <div class="absolute bottom-0 right-1 top-0 flex flex-row items-center">
      <div class="relative flex h-full flex-row items-center gap-1">
        <div class="invisible group-hover:visible relative flex h-full flex-row items-center gap-1">
          <button class="flex h-6 flex-row items-center gap-1 rounded-md border border-slate-300 bg-white px-1 text-slate-700 hover:bg-gray-200 active:bg-gray-300">
            <PanelRightIcon />
            <div class="text-xs leading-[20px]">Open</div>
          </button>
          <button class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-slate-300 bg-white hover:bg-gray-200 active:bg-gray-300">
            <EditIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const ImportIcon = () => {
  return <Lucide.ArrowUpToLine size={16} strokeWidth={1.6} />;
};

const PlusIcon = () => {
  return <Lucide.Plus size={16} strokeWidth={1.6} />;
};

const ChevronDownIcon = () => {
  return <Lucide.ChevronDown size={16} strokeWidth={1.6} />;
};

const FilterIcon = () => {
  return <Lucide.ListFilter size={16} strokeWidth={1.6} />;
};

const BoxArrowUpIcon = () => {
  return <Lucide.ArrowUpSquare size={16} strokeWidth={1.6} />;
};

const BoxPlusIcon = () => {
  return <Lucide.PlusSquare size={16} strokeWidth={1.6} />;
};

const PanelRightIcon = () => {
  return <Lucide.PanelRight size={16} strokeWidth={1.6} />;
};

const EditIcon = () => {
  return <Lucide.FileEdit size={16} strokeWidth={1.6} />;
};
