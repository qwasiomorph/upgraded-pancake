import { FC, FormEvent, memo, SyntheticEvent, useState } from "react";

const NewTaskForm: FC<Record<"addTask", Function>> = ({ addTask }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e: SyntheticEvent) => {
    setInputValue((e.target as HTMLInputElement).value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={inputValue}
        onChange={handleInputValue}
      />
      <input data-testid="submit-new" className="hidden" type="submit" />
    </form>
  );
};

export default memo(NewTaskForm);
