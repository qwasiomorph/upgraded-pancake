import { FC } from "react";
import { filter, Task as ITask } from "./App";
import Task from "./Task";

interface TaskListProps {
  tasks: ITask[];
  toggleCompleted: Function;
  removeTask: Function;
  editTask: Function;
  filter: filter;
  currEditedId: string;
  setEditedTask: Function;
}

const TaskList: FC<TaskListProps> = ({
  tasks,
  toggleCompleted,
  removeTask,
  editTask,
  filter,
  currEditedId,
  setEditedTask,
}) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    }
    if (filter === "Completed") {
      return !task.active;
    }
    if (filter === "Active") {
      return task.active;
    }
  });

  return (
    <ul className="todo-list">
      {filteredTasks.map((task) => (
        <Task
          key={task.id}
          info={task}
          active={task.active}
          toggleCompleted={toggleCompleted}
          removeTask={removeTask}
          editTask={editTask}
          currEditedId={currEditedId}
          setEditedTask={setEditedTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
