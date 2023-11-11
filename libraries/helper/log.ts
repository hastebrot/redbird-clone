import { Fmt } from "./fmt.ts";

export const Log = {
  // deno-lint-ignore no-explicit-any
  debug(...data: any[]) {
    console.debug(...data);
  },

  // deno-lint-ignore no-explicit-any
  error(...data: any[]) {
    console.error(...data);
  },

  // deno-lint-ignore no-explicit-any
  log(label: string, ...data: any[]) {
    console.log(label + ":", ...data);
  },

  // deno-lint-ignore no-explicit-any
  mark(label: string, startMark: PerformanceMark, ...data: any[]) {
    const measure = performance.measure(label, { start: startMark.startTime });
    console.log(label + ":", { mark: Fmt.millis(measure.duration) }, ...data);
  },

  // deno-lint-ignore no-explicit-any
  async time(label: string, dataPromise: Promise<any> | (() => Promise<any>)) {
    const start = performance.now();
    const data = typeof dataPromise === "function" ? await dataPromise() : await dataPromise;
    const end = performance.now();
    console.log(
      label + ":",
      { time: Fmt.millis(end - start) },
      Deno.inspect(data, { depth: 5, colors: true })
    );
  },
};
