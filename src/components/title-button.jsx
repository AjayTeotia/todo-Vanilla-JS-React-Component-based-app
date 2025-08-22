import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Input } from "./input";

export function TittleButton({ title, addNewTask }) {
  const [task, setTask] = useState("");

  // Handle form submission
  function handleAddNewTask(e) {
    e.preventDefault();
    addNewTask(task);
    setTask("");
  }

  return (
    <div className="flex flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>

      {title === "Today" && (
        <form
          onSubmit={handleAddNewTask}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Input
            onChange={setTask}
            value={task}
            icon={PlusIcon}
            placeholder="Add a task..."
          />

          <button
            type="submit"
            className="p-1.5 border rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <span className="hidden sm:inline">Add Task</span>

            <PlusIcon className="sm:hidden size-5" />
          </button>
        </form>
      )}
    </div>
  );
}
