import { useEffect, useState } from "react";
import { Header } from "./components/header";
import { Navbar } from "./components/navbar";
import { TittleButton } from "./components/title-button";
import { TaskCard } from "./components/task-card";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Utility function: format date without time for comparisons
  function formatDate(date) {
    return date.toLocaleDateString();
  }

  // Calculate dates for today and yesterday
  const today = formatDate(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = formatDate(yesterdayDate);

  // Load tasks and clean old tasks (remove older than yesterday)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("tasks");
      const parsed = stored ? JSON.parse(stored) : [];

      if (Array.isArray(parsed)) {
        // Keep only tasks for today or yesterday
        const cleanedTasks = parsed.filter(
          (task) => task.date === today || task.date === yesterday
        );
        setTasks(cleanedTasks);
      } else {
        setTasks([]);
      }
    } catch {
      setTasks([]);
    } finally {
      setLoaded(true);
    }
  }, [today, yesterday]);

  // Save tasks to localStorage
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  // Add task (only for today)
  function addNewTask(newTask) {
    if (newTask.trim() === "") return;

    const existingTask = tasks.find(
      (t) => t.text === newTask && t.date === today
    );
    if (existingTask) {
      alert("Task already exists for today!");
      return;
    }

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      date: today,
      completed: false,
    };

    setTasks([...tasks, newTaskObj]);
  }

  // Filtered list for today based on search query
  const filteredTodayTasks = tasks.filter(
    (task) =>
      task.date === today &&
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered list for yesterday based on search query
  const filteredYesterdayTasks = tasks.filter(
    (task) =>
      task.date === yesterday &&
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  // Toggle completion
  function toggleTaskCompletion(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  }

  return (
    <main className="min-h-screen font-sans antialiased mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />

      <div className="mb-6 mt-14 sm:mt-20">
        <Header />
      </div>

      <div className="h-px bg-black/50" />

      <div className="mb-6 mt-7 sm:mt-10">
        <TittleButton title="Today" addNewTask={addNewTask} />

        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTodayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onToggleTaskCompletion={toggleTaskCompletion}
              />
            ))}
          </div>

          {tasks.filter((t) => t.date === today).length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-4">
              No tasks added yet for today. Start by adding a new task!
            </p>
          ) : filteredTodayTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-4">
              No tasks found for today.
            </p>
          ) : null}
        </div>
      </div>

      <div className="h-px bg-black/50" />

      <div className="mb-6 mt-7 sm:mt-10">
        <TittleButton title="Yesterday" />

        <div className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredYesterdayTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDeleteTask={deleteTask}
                onToggleTaskCompletion={toggleTaskCompletion}
              />
            ))}
          </div>

          {tasks.filter((t) => t.date === yesterday).length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-4">
              No tasks for yesterday.
            </p>
          ) : filteredYesterdayTasks.length === 0 ? (
            <p className="text-gray-400 text-sm text-center mt-4">
              No tasks found for yesterday.
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default App;
