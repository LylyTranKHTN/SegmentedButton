import {
  expect,
  describe,
  jest,
  test,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  let mockOnClick: jest.Mock;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should call onClick when clicked normal button", () => {
    render(
      <Button id="1" label="Button 1" onClick={mockOnClick} selected={false} />
    );

    const button = screen.getByText("Button 1");
    expect(button.getAttribute("class")).not.toContain(
      "segment-button-item-selected"
    );
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledWith("1");
  });

  test("should be disabled when disabled prop is true", () => {
    render(
      <Button
        id="1"
        label="Button 1"
        onClick={mockOnClick}
        disabled={true}
        selected={false}
      />
    );

    const disabledButton = screen.getByText("Button 1");
    expect(disabledButton.hasAttribute("disabled")).toBeDefined();
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("should show selected image when selected prop is true", () => {
    render(
      <Button id="1" label="Button 1" onClick={mockOnClick} selected={true} />
    );

    const button = screen.getByText("Button 1");

    expect(button.getAttribute("class")).toContain(
      "segment-button-item-selected"
    );
    expect(screen.getAllByRole("img")).toBeDefined();
  });

  test("should not show selected image when selected prop is false", () => {
    render(
      <Button id="1" label="Button 1" onClick={mockOnClick} selected={false} />
    );

    const button = screen.getByText("Button 1");
    expect(button.getAttribute("class")).not.toContain(
      "segment-button-item-selected"
    );
    expect(screen.queryByRole("img")).toBeNull();
  });
});
