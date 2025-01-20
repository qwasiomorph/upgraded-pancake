import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("renders w/o crash", () => {
  it("Renders without Crashing", () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    expect(getByText(/todos/)).toBeInTheDocument();
    expect(getByPlaceholderText(/What needs to be done?/)).toBeInTheDocument();
  });

  it("adds task", () => {
    const {
      getByText,
      getByRole,
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
    } = render(<App />);
    expect(getByText(/No items/)).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText("What needs to be done?"), {
      target: { value: "test_task_1" },
    });
    const refoundInput = getByDisplayValue("test_task_1");
    expect(refoundInput).toBeInTheDocument();
    fireEvent.submit(getByTestId("submit-new"));
    expect(getByRole("textbox", { type: "checkbox", class: "toggle" }));
    expect(getByText(/test_task_1/)).toBeInTheDocument();
  });

  it("adds and removes task", async () => {
    const {
      getByText,
      getByRole,
      getByDisplayValue,
      getByPlaceholderText,
      getByTestId,
    } = render(<App />);
    expect(getByText(/No items/)).toBeInTheDocument();
    fireEvent.change(getByPlaceholderText("What needs to be done?"), {
      target: { value: "test_task_2" },
    });
    const refoundInput = getByDisplayValue("test_task_2");
    expect(refoundInput).toBeInTheDocument();
    fireEvent.submit(getByTestId("submit-new"));
    expect(getByRole("textbox", { type: "checkbox", class: "toggle" }));
    expect(getByText(/test_task_2/)).toBeInTheDocument();
    fireEvent.click(getByTestId("remove_test_task_2"));
    expect(getByText(/No items/)).toBeInTheDocument();
  });
});
