import React, { useState, useRef, useEffect } from "react";
import { trackEvent } from "./analytics/track.js";

function ToDoList() {
  // Stable id counter for tasks
  const nextIdRef = useRef(0);
  const makeTask = (text) => ({ id: nextIdRef.current++, text });

  const [tasks, setTasks] = useState([
    makeTask("eat"),
    makeTask("code"),
    makeTask("make portfolio(eventually)"),
  ]);
  const [newTask, setNewTask] = useState("");

  // Track ids that are in the process of being removed (to play animation)
  const [deletingIds, setDeletingIds] = useState(new Set());
  // Track last moved task id to trigger highlight animation
  const [movedTaskId, setMovedTaskId] = useState(null);
  const [lastAddedId, setLastAddedId] = useState(null);
  // Clear moved indicator after animation duration
  useEffect(() => {
    if (movedTaskId == null) return;
    const t = setTimeout(() => setMovedTaskId(null), 900); // match CSS animation
    return () => clearTimeout(t);
  }, [movedTaskId]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() === "") return;
    const taskObj = makeTask(newTask.trim());
    setTasks((prev) => [...prev, taskObj]);
    setLastAddedId(taskObj.id);
    trackEvent("todo_added", {
      task_id: taskObj.id,
      length: taskObj.text.length,
    });
    // Clear enter animation marker after it runs
    setTimeout(
      () => setLastAddedId((id) => (id === taskObj.id ? null : id)),
      400
    );
    setNewTask("");
  }

  function deleteTask(id) {
    // Find the DOM element to capture its height before collapsing
    const li = document.querySelector(`li[data-task-id='${id}']`);
    if (li) {
      li.style.setProperty("--item-height", li.offsetHeight + "px");
      li.classList.add("capture-height");
    }
    setDeletingIds((prev) => new Set(prev).add(id));
    // Wait for animation to finish before removing from state (match CSS 320ms)
    setTimeout(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      trackEvent("todo_deleted", { task_id: id });
    }, 320);
  }

  function moveTaskUp(index) {
    if (index <= 0) return;
    setTasks((prev) => {
      const arr = [...prev];
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      setMovedTaskId(arr[index - 1].id); // the task we moved
      trackEvent("todo_moved", {
        task_id: arr[index - 1].id,
        direction: "up",
        position: index - 1,
      });
      return arr;
    });
  }

  function moveTaskDown(index) {
    if (index >= tasks.length - 1) return;
    setTasks((prev) => {
      const arr = [...prev];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      setMovedTaskId(arr[index + 1].id); // the task we moved down
      trackEvent("todo_moved", {
        task_id: arr[index + 1].id,
        direction: "down",
        position: index + 1,
      });
      return arr;
    });
  }

  return (
    <div className="to-do-list">
      <h1>To-Do-List</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>
          Add
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => {
          const isDeleting = deletingIds.has(task.id);
          const isMoved = movedTaskId === task.id;
          const liClass = [
            isDeleting ? "item-removing" : "",
            isMoved ? "item-moved" : "",
            lastAddedId === task.id ? "item-enter" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <li key={task.id} data-task-id={task.id} className={liClass}>
              <span className="text">{task.text}</span>
              <button
                className="delete-button"
                disabled={isDeleting}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
              <button
                className="move-button"
                disabled={isDeleting}
                onClick={() => moveTaskUp(index)}
              >
                ⬆︎
              </button>
              <button
                className="move-button"
                disabled={isDeleting}
                onClick={() => moveTaskDown(index)}
              >
                ⬇︎
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ToDoList;
