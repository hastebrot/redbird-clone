import { KvStore, migrateKvStore } from "../../libraries/database/kv.ts";
import { postgres } from "../../libraries/database/pg.ts";
import { Env, Log } from "../../libraries/helper/mod.ts";
import { apiHandler } from "./api.ts";

const domainName = "redbird";
const serviceName = "backend";
const apiPort = Env.integerOrThrow("PORT");
const postgresAddr = "0.0.0.0:5432";
const postgresSchema = `${domainName}.${serviceName}`;

if (import.meta.main) {
  const sql = postgres(
    `postgres://postgres:postgres@${postgresAddr}?search_path=${postgresSchema}`,
    {
      onnotice: () => {}, // defaults to console.log.
      max: 10, // max number of connections.
      idle_timeout: 0, // idle connection timeout in seconds.
      connect_timeout: 30, // connect timeout in seconds.
      prepare: true, // enables prepare mode.
    }
  );
  addEventListener("beforeunload", async () => {
    await sql.end();
  });
  await migrateKvStore(sql, postgresSchema, false);
  const ctx = {
    kv: new KvStore(sql),
  };
  // console.log(await sql`select count(*) from kv;`)

  Deno.serve({
    port: apiPort,
    onListen() {
      Log.debug("http server running", { domainName, serviceName, apiPort });
    },
    async handler(req: Request) {
      return await apiHandler(ctx, req);
    },
  });
}
