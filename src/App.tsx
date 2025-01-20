import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import NewTaskForm from "./NewTaskForm.tsx";
import TaskList from "./TaskList";
import Footer from "./Footer";

export interface Task {
  id: string;
  desc: string;
  active: boolean;
}

export type filter = "All" | "Active" | "Completed";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<filter>("All");
  const [currEditedId, setCurrEditedId] = useState("");

  const setEditedTask = useCallback(
    (value: string) => {
      setCurrEditedId(value);
    },
    [currEditedId]
  );

  const addTask = useCallback(
    (value: string) => {
      if (value.trim()) {
        let newTask: Task = {
          id: uuidv4(),
          desc: value,
          active: true,
        };
        setTasks([...tasks, newTask]);
      }
    },
    [tasks.length]
  );

  const toggleCompleted = useCallback(
    (id: string) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            let newTask = task;
            newTask.active = !newTask.active;
            return newTask;
          } else {
            return task;
          }
        })
      );
    },
    [filter, tasks.length]
  );

  const removeTask = useCallback(
    (idForRemove: string) => {
      setTasks(tasks.filter(({ id }) => !(id === idForRemove)));
    },
    [tasks.length]
  );

  const editTask = useCallback(
    (idForEdit: string, value: string) => {
      if (value.trim()) {
        setTasks(
          tasks.map((task) => {
            if (task.id === idForEdit) {
              let newTask = task;
              newTask.desc = value;
              return newTask;
            } else {
              return task;
            }
          })
        );
      }
    },
    [tasks.length, currEditedId]
  );

  const clearCompleted = useCallback(() => {
    setTasks(tasks.filter(({ active }) => active));
  }, [tasks.length]);

  const aciveTasksAmount = tasks
    .filter(({ active }) => active)
    .reduce((prev) => prev + 1, 0);
  return (
    <section className="todoapp">
      <header>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          toggleCompleted={toggleCompleted}
          removeTask={removeTask}
          editTask={editTask}
          filter={filter}
          currEditedId={currEditedId}
          setEditedTask={setEditedTask}
        />
        <Footer
          filter={filter}
          setFilter={setFilter}
          length={aciveTasksAmount}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
};

export default App;
