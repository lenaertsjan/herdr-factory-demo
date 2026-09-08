# Taskbox — herdr-factory demo

A deliberately small, local-first task manager used to exercise
[`herdr-factory`](https://github.com/lenaertsjan/herdr-factory). Tasks are stored
in the browser's `localStorage`; there is no backend or database.

## Run it

Requires Node.js 20 or newer for tests. The application itself uses only browser
APIs and has no runtime dependencies.

```sh
npm test
npm start
```

Open <http://localhost:4173>.

## Factory contract

- Keep the application dependency-free unless an issue explicitly says otherwise.
- Add or update tests for domain logic in `test/`.
- Run `npm test` before reporting completion.
- Implement only the selected issue and its acceptance criteria.

The backlog intentionally contains independent work, dependencies, UI changes,
data migrations and test-focused tasks so an orchestrator run exercises more
than simple text edits.
