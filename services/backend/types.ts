import { KvStore } from "../../libraries/database/kv.ts";

export type Context = {
  kv: KvStore;
};

export type ClientContext = {
  workspace: string;
  kv: KvStore;
};
