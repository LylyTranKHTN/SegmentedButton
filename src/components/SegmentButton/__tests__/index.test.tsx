import {
  expect,
  describe,
  jest,
  test,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { render, fireEvent, screen } from "@testing-library/react";
import SegmentButton from "../index";

const mockButtons = [
  { id: "1", label: "Button 1" },
  { id: "2", label: "Button 2" },
  { id: "3", label: "Button 3" },
  { id: "4", label: "Button 4", disabled: true },
];

describe("SegmentButton", () => {
  describe("Single Selection", () => {
    let mockOnChange: jest.Mock;

    beforeEach(() => {
      mockOnChange = jest.fn();
      render(<SegmentButton buttons={mockButtons} onChange={mockOnChange} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should call onChange when select a button successfully", () => {
      const button = screen.getByText("Button 1");
      fireEvent.click(button);

      expect(button.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
      expect(mockOnChange).toHaveBeenCalledWith(["1"]);
    });
    test("should deselect the previously selected button", () => {
      const button1 = screen.getByText("Button 1");
      const button2 = screen.getByText("Button 2");

      // Select button 1
      fireEvent.click(button1);
      expect(button1.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
      expect(mockOnChange).toHaveBeenCalledWith(["1"]);

      // Select button 2
      fireEvent.click(button2);
      expect(mockOnChange).toHaveBeenCalledWith(["2"]);
      expect(button1.getAttribute("class")).not.toContain(
        "segment-button-item-selected"
      );
      expect(button2.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
    });

    test("should not allow selection of disabled buttons", () => {
      const disabledButton = screen.getByText("Button 4");

      fireEvent.click(disabledButton);

      expect(disabledButton.hasAttribute("disabled")).toBeDefined();
      expect(mockOnChange).not.toHaveBeenCalledWith(["4"]);
    });
  });

  describe("Multiple Selection", () => {
    let mockOnChange: jest.Mock;
    beforeEach(() => {
      mockOnChange = jest.fn();
      render(
        <SegmentButton buttons={mockButtons} onChange={mockOnChange} multiple />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should select multiple buttons", () => {
      const button1 = screen.getByText("Button 1");
      const button2 = screen.getByText("Button 2");

      fireEvent.click(button1);
      expect(button1.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );

      fireEvent.click(button2);
      expect(button2.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
      expect(mockOnChange).toHaveBeenCalledWith(["1", "2"]);
      // should keep button 1 selected
      expect(button1.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
    });
    test("should deselect a button when clicked again", () => {
      const button1 = screen.getByText("Button 1");
      const button2 = screen.getByText("Button 2");

      // Select button 1
      fireEvent.click(button1);
      expect(button1.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );

      // Select button 2
      fireEvent.click(button2);
      expect(button2.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
      expect(mockOnChange).toHaveBeenCalledWith(["1", "2"]);

      // Deselect button 1
      fireEvent.click(button1);
      expect(button1.getAttribute("class")).not.toContain(
        "segment-button-item-selected"
      );
      expect(button2.getAttribute("class")).toContain(
        "segment-button-item-selected"
      );
      expect(mockOnChange).toHaveBeenCalledWith(["2"]);
    });
    test("should not allow selection of disabled buttons", () => {
      const disabledButton = screen.getByText("Button 4");

      fireEvent.click(disabledButton);

      expect(disabledButton.hasAttribute("disabled")).toBeDefined();
      expect(mockOnChange).not.toHaveBeenCalledWith(["4"]);
    });
  });
});
