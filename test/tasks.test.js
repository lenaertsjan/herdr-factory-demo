import test from "node:test";
import assert from "node:assert/strict";

import {
  createTask,
  normalizeTitle,
  parseStoredTasks,
  removeTask,
  toggleTask,
} from "../src/tasks.js";

test("normalizeTitle trims and collapses whitespace", () => {
  assert.equal(normalizeTitle("  write   tests  "), "write tests");
});

test("createTask creates an active task", () => {
  assert.deepEqual(createTask(" Ship demo ", { id: "task-1", createdAt: "2026-01-01" }), {
    id: "task-1",
    title: "Ship demo",
    completed: false,
    createdAt: "2026-01-01",
  });
});

test("createTask rejects an empty title", () => {
  assert.throws(() => createTask("   "), /required/);
});

test("toggleTask changes only the requested task", () => {
  const tasks = [
    { id: "one", title: "One", completed: false, createdAt: "now" },
    { id: "two", title: "Two", completed: false, createdAt: "now" },
  ];
  assert.deepEqual(toggleTask(tasks, "two"), [tasks[0], { ...tasks[1], completed: true }]);
});

test("removeTask removes the requested task", () => {
  const tasks = [
    { id: "one", title: "One", completed: false, createdAt: "now" },
    { id: "two", title: "Two", completed: false, createdAt: "now" },
  ];
  assert.deepEqual(removeTask(tasks, "one"), [tasks[1]]);
});

test("parseStoredTasks handles invalid and partially corrupt storage", () => {
  assert.deepEqual(parseStoredTasks("not-json"), []);
  assert.deepEqual(parseStoredTasks('{"wrong":true}'), []);
  assert.deepEqual(
    parseStoredTasks(
      JSON.stringify([
        { id: "ok", title: "Valid", completed: false, createdAt: "now" },
        { id: "bad", title: 42 },
      ]),
    ),
    [{ id: "ok", title: "Valid", completed: false, createdAt: "now" }],
  );
});
