import { TrashIcon } from "lucide-react";

export function TaskCard({ task, onDeleteTask, onToggleTaskCompletion }) {
  return (
    <div
      className={`flex flex-col border p-5 rounded-xl transition 
        ${
          task.completed
            ? "bg-green-50 border-green-400"
            : "bg-white border-gray-300"
        } 
        hover:shadow-lg shadow-sm gap-4`}
    >
      <label className="flex items-start gap-3 cursor-pointer flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTaskCompletion(task.id)}
          className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500 mt-1"
        />
        <span
          className={`text-gray-800 select-none text-base ${
            task.completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task.text}
        </span>
      </label>

      <div className="flex flex-row sm:items-center justify-between gap-2 sm:gap-6 text-sm text-gray-500">
        <span className="whitespace-nowrap">{task.date}</span>
        <span
          className={`font-semibold whitespace-nowrap ${
            task.completed ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        onClick={() => onDeleteTask(task.id)}
        className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-md transition text-sm"
        aria-label="Delete task"
      >
        <TrashIcon className="inline-block mr-2 size-4" /> Delete
      </button>
    </div>
  );
}
