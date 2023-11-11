const headers = {
  "X-Workspace": "test",
};

export const DocumentClient = {
  async readDocuments(authorId: string) {
    const res = await fetch("http://localhost:4041/read-documents", {
      method: "POST",
      body: JSON.stringify({ authorId }),
      headers,
    });
    return await res.json();
  },
};
