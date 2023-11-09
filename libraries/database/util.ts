import { format as formatMillis } from "https://deno.land/std@0.205.0/fmt/duration.ts";
import { format as formatBytes } from "https://deno.land/std@0.205.0/fmt/bytes.ts";

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

export const Json = {
  // deno-lint-ignore no-explicit-any
  write(text: any): string {
    return JSON.stringify(text);
  },

  read(text: string): string {
    return JSON.parse(text);
  },
};

export const Fmt = {
  millis(millis: number, roundTo: "millis" | "micros" = "micros"): string {
    if (roundTo === "millis") {
      millis = Math.round(millis);
    } else if (roundTo === "micros") {
      millis = Math.round(millis * 1e3) / 1e3;
    }
    return millis === 0 ? "0ms" : formatMillis(millis, { ignoreZero: true });
  },

  bytes(bytes: number): string {
    return formatBytes(bytes);
  },
};
