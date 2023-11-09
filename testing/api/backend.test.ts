import { assertObjectMatch } from "https://deno.land/std@0.205.0/testing/asserts.ts";
import { consumeJson, fetchPost } from "../helper.ts";

Deno.test("write entries, read entries by author", async () => {
  // given:
  await consumeJson(
    fetchPost({
      url: "http://localhost:4041/write-entry",
      bodyParams: { id: "id-entry-1", title: "Entry 1", authorId: "id-author" },
    })
  );
  await consumeJson(
    fetchPost({
      url: "http://localhost:4041/write-entry",
      bodyParams: { id: "id-entry-2", title: "Entry 2", authorId: "id-author" },
    })
  );

  // when:
  const res = await fetchPost({
    url: "http://localhost:4041/read-entries",
    bodyParams: { authorId: "id-author" },
  });

  // then:
  assertObjectMatch(await consumeJson(res), {
    ok: true,
    result: {
      entries: [
        {
          id: "id-entry-1",
          title: "Entry 1",
        },
        {
          id: "id-entry-2",
          title: "Entry 2",
        },
      ],
    },
    count: { entries: 2 },
  });
});
