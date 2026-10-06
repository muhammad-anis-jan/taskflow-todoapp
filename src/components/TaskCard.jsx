import { useState } from "react";

export default function TaskCard({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.task ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const saveEdit = async (event) => {
    event.preventDefault();
    const nextTask = draft.trim();
    if (!nextTask) {
      setError("Task ka naam khali nahi ho sakta.");
      return;
    }
    if (nextTask === todo.task) {
      setEditing(false);
      return;
    }

    setBusy(true);
    setError("");
    try {
      await onEdit(todo.id, nextTask);
      setEditing(false);
    } catch {
      setError("Task save nahi hua. Firestore rules check karke dobara try karein.");
    } finally {
      setBusy(false);
    }
  };

  const deleteTask = async () => {
    if (!window.confirm(`Delete "${todo.task}"?`)) return;
    setBusy(true);
    setError("");
    try {
      await onDelete(todo.id);
    } catch {
      setError("Task delete nahi hua. Firestore rules check karke dobara try karein.");
      setBusy(false);
    }
  };

  return (
    <article className={`task ${todo.completed ? "done" : ""}`}>
      <button
        className="circle"
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? "Mark task active" : "Mark task complete"}
        disabled={busy}
      >
        {todo.completed ? "✓" : ""}
      </button>

      {editing ? (
        <form className="task-copy task-edit-form" onSubmit={saveEdit}>
          <label className="sr-only" htmlFor={`edit-${todo.id}`}>Edit task</label>
          <input
            id={`edit-${todo.id}`}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            maxLength={200}
            autoFocus
            disabled={busy}
          />
          <div className="task-edit-actions">
            <button className="icon-btn task-save" type="submit" disabled={busy || !draft.trim()}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button
              className="icon-btn task-cancel"
              type="button"
              onClick={() => { setEditing(false); setDraft(todo.task ?? ""); setError(""); }}
              disabled={busy}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="task-copy">
          <b>{todo.task}</b>
        </div>
      )}

      {!editing && (
        <>
          <button
            className="icon-btn"
            type="button"
            onClick={() => { setDraft(todo.task ?? ""); setEditing(true); setError(""); }}
            disabled={busy}
            aria-label={`Edit ${todo.task}`}
          >
            Edit
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={deleteTask}
            disabled={busy}
            aria-label={`Delete ${todo.task}`}
          >
            {busy ? "…" : "Delete"}
          </button>
        </>
      )}
      {error && <small role="alert">{error}</small>}
    </article>
  );
}
