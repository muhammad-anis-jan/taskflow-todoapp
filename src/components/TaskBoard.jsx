import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import EmptyTaskState from "./EmptyTaskState";
import TaskCard from "./TaskCard";
import TaskComposer from "./TaskComposer";

export default function TaskBoard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setTodos([]);
          return;
        }

        const q = query(
          collection(db, "todos"),
          where("userId", "==", currentUser?.uid),
        );

        const snapshot = await getDocs(q);

        setTodos(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          })),
        );
      } catch (err) {
        console.error("Error getting todos:", err);
        setError("Tasks load nahi ho sake. Firestore rules check karein.");
      } finally {
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  console.log(auth.currentUser?.uid);
  const addTodo = async (task) => {
    setError("");
    try {
      const newTodo = {
        userId: auth?.currentUser?.uid,
        task: task.trim(),
        completed: false,
      };

      const result = await addDoc(collection(db, "todos"), newTodo);
      setTodos((current) => [{ id: result.id, ...newTodo }, ...current]);
    } catch (err) {
      console.error("Error adding task:", err);
      setError("Task add nahi hua. Firestore create permission check karein.");
      throw err;
    }
  };

  const editTodo = async (id, task) => {
    setError("");
    try {
      await updateDoc(doc(db, "todos", id), { task: task.trim() });
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, task: task.trim() } : todo,
        ),
      );
    } catch (err) {
      console.error("Error editing task:", err);
      setError("Task edit nahi hua. Firestore update permission check karein.");
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((item) => item.id === id);
    if (!todo) return;
    setError("");
    try {
      await updateDoc(doc(db, "todos", id), { completed: !todo.completed });
      setTodos((current) =>
        current.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item,
        ),
      );
    } catch (err) {
      console.error("Error updating task status:", err);
      setError(
        "Task status update nahi hua. Firestore update permission check karein.",
      );
    }
  };

  const removeTodo = async (id) => {
    setError("");
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos((current) => current.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(
        "Task delete nahi hua. Firestore delete permission check karein.",
      );
      throw err;
    }
  };

  const visibleTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <>
      <div className="task-head">
        <div>
          <small className="kicker">YOUR TASK LIST</small>
          <h1>
            Your tasks<span>.</span>
          </h1>
          <p>A clear mind starts with a clear plan.</p>
        </div>
        <button className="date" type="button">
          {new Date().toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          })}
        </button>
      </div>

      <section className="task-panel">
        <b>My tasks ({todos.length})</b>
        <p>Small steps add up to big things.</p>
        <TaskComposer onAdd={addTodo} />
        {error && <p role="alert">{error}</p>}
        <div className="filters" aria-label="Filter tasks">
          {["All", "Active", "Completed"].map((option) => (
            <button
              className={filter === option ? "selected" : ""}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              key={option}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section aria-live="polite">
        {loading ? (
          <p>Tasks load ho rahe hain...</p>
        ) : visibleTodos.length ? (
          visibleTodos.map((todo) => (
            <TaskCard
              key={todo.id}
              todo={todo}
              onEdit={editTodo}
              onDelete={removeTodo}
              onToggle={toggleTodo}
            />
          ))
        ) : (
          <EmptyTaskState />
        )}
      </section>
    </>
  );
}
