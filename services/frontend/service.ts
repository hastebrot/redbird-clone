import { Env, Log } from "../../libraries/helper/mod.ts";
import { apiHandler } from "./api.ts";

const domainName = "redbird";
const serviceName = "frontend";
const apiPort = Env.integerOrThrow("PORT");

if (import.meta.main) {
  Deno.serve({
    port: apiPort,
    onListen() {
      Log.debug("http server running", { domainName, serviceName, apiPort });
    },
    async handler(req: Request) {
      return await apiHandler(req);
    },
  });
}
