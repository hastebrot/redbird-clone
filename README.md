### redbird-clone

setup:

- install [deno](https://deno.com/), `brew install deno`
- install [postgres](https://www.postgresql.org/), `brew install postgresql@16`

usage:

```
❯ psql -h localhost -U postgres -d postgres
❯ deno task dev
❯ open --url "http://localhost:4040/"
```

usage (tests):

```
❯ deno task test:watch --fail-fast --reporter=dot
```
