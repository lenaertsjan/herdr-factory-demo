export function normalizeTitle(title) {
  if (typeof title !== "string") return "";
  return title.trim().replace(/\s+/g, " ");
}

export function createTask(title, options = {}) {
  const normalized = normalizeTitle(title);
  if (!normalized) throw new Error("A task title is required");

  return {
    id: options.id ?? crypto.randomUUID(),
    title: normalized,
    completed: false,
    createdAt: options.createdAt ?? new Date().toISOString(),
  };
}

export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function parseStoredTasks(value) {
  if (!value) return [];

  try {
    const tasks = JSON.parse(value);
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(
      (task) =>
        task &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "string",
    );
  } catch {
    return [];
  }
}
