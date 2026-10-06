import { useState } from "react";

export default function TaskComposer({ onAdd }) {
  const [task, setTask] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const addTodo = async (event) => {
    event.preventDefault();
    const nextTask = task.trim();
    if (!nextTask) {
      setError("Pehle task ka naam likhein.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onAdd(nextTask);
      setTask("");
    } catch {
      setError("Task add nahi hua. Firestore rules check karein.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={addTodo} className="composer">
      <div>
        <input
          aria-label="Task title"
          placeholder="Add Your Task"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          maxLength={200}
          disabled={saving}
        />
      </div>
      <button className="button" type="submit" disabled={saving}>
        {saving ? "Adding…" : "Add task"}
      </button>
      {error && <small role="alert">{error}</small>}
    </form>
  );
}
