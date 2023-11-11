import { assertObjectMatch } from "https://deno.land/std@0.206.0/testing/asserts.ts";
import { consumeJson, fetchPost } from "../helper.ts";

Deno.test("write documents, read documents by author", async () => {
  // given:
  await consumeJson(
    fetchPost({
      url: "http://localhost:4041/write-document",
      bodyParams: {
        id: "id-document-1",
        title: "Document 1",
        authorId: "id-author",
        authorName: "Author Name",
      },
    })
  );
  await consumeJson(
    fetchPost({
      url: "http://localhost:4041/write-document",
      bodyParams: {
        id: "id-document-2",
        title: "Document 2",
        authorId: "id-author",
        authorName: "Author Name",
      },
    })
  );
  await consumeJson(
    fetchPost({
      url: "http://localhost:4041/write-document",
      bodyParams: {
        id: "id-document-3",
        title: "Document 3",
        authorId: "id-author",
        authorName: "Author Name",
      },
    })
  );

  // when:
  const res = await fetchPost({
    url: "http://localhost:4041/read-documents",
    bodyParams: { authorId: "id-author" },
  });

  // then:
  assertObjectMatch(await consumeJson(res), {
    ok: true,
    result: {
      documents: [
        {
          id: "id-document-1",
          title: "Document 1",
        },
        {
          id: "id-document-2",
          title: "Document 2",
        },
        {
          id: "id-document-3",
          title: "Document 3",
        },
      ],
    },
    count: { documents: 3 },
  });
});
