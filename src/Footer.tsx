import { FC } from "react";
import TasksFilter from "./TasksFilter";
import { filter } from "./App";

interface FooterProps {
  filter: filter;
  setFilter: Function;
  length: number;
  clearCompleted: React.MouseEventHandler<HTMLButtonElement>;
}

const Footer: FC<FooterProps> = ({
  filter,
  setFilter,
  length,
  clearCompleted,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {length === 0 ? "No" : length} item{length !== 1 ? "s" : ""}{" "}
        {length === 0 ? "" : "left"}
      </span>
      <TasksFilter filter={filter} setFilter={setFilter} />
      <button
        type="button"
        className="clear-completed"
        onClick={clearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
