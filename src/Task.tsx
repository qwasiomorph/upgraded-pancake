import { FC, memo, SyntheticEvent, useState } from "react";
import { Task as ITask } from "./App";

interface TaskProps {
  info: ITask;
  active: boolean;
  toggleCompleted: Function;
  removeTask: Function;
  editTask: Function;
  currEditedId: string;
  setEditedTask: Function;
}

const Task: FC<TaskProps> = ({
  info,
  active,
  toggleCompleted,
  removeTask,
  editTask,
  currEditedId,
  setEditedTask,
}) => {
  const [editValue, setEditValue] = useState(info.desc);

  const handleEditChange = (e: SyntheticEvent) => {
    setEditValue((e.target as HTMLInputElement).value);
  };
  const handleComplete = () => {
    toggleCompleted(info.id);
  };
  const handleDelete = () => {
    removeTask(info.id);
  };
  const handleEditClick = () => {
    setEditedTask(info.id);
  };
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      editTask(info.id, editValue);
      setEditedTask("");
    }
  };

  const editing = currEditedId === info.id;
  const taskClassName = !active ? "completed" : editing ? "editing" : "";
  return (
    <li className={taskClassName}>
      <div className="view">
        <input
          id={info.id}
          className="toggle"
          type="checkbox"
          checked={!info.active}
          onChange={handleComplete}
        />
        <label htmlFor={info.id}>
          <span className="title">{info.desc}</span>
        </label>
        <button
          type="button"
          className="button-edit"
          onClick={handleEditClick}
        ></button>
        <button
          type="button"
          className="destroy"
          data-testid={`remove_${info.desc}`}
          onClick={handleDelete}
        ></button>
      </div>
      {editing ? (
        <input
          type="text"
          className="edit"
          value={editValue}
          onChange={handleEditChange}
          onKeyDown={handleEditKeyDown}
          autoFocus
        />
      ) : (
        <></>
      )}
    </li>
  );
};

export default memo(Task);
