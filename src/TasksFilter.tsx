import { FC, SyntheticEvent } from "react";
import { filter } from "./App";

interface FilterProps {
  filter: filter;
  setFilter: Function;
}

const TasksFilter: FC<FilterProps> = ({ filter, setFilter }) => {
  const handleFilter = (event: SyntheticEvent) => {
    event.preventDefault();
    const { name } = event.target as HTMLButtonElement;
    setFilter(name);
  };

  const filters: filter[] = ["All", "Active", "Completed"];

  return (
    <ul className="filters">
      {filters.map((filt) => (
        <li key={filt}>
          <button
            type="button"
            name={filt}
            className={filter === filt ? "selected" : ""}
            onClick={handleFilter}
          >
            {filt}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TasksFilter;
