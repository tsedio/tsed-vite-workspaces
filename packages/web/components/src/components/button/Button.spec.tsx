import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Link, Router } from "react-router-dom";

import { Button } from "./Button";

const history = createMemoryHistory({
  initialEntries: ["/link/path"],
  initialIndex: 1
});

describe("Button Component", () => {
  test("it should render a button with default tag and label", () => {
    render(<Button>Label</Button>);

    expect(screen.getByRole("button")).toHaveTextContent("Label");
    expect(screen.getByRole("button")).toHaveClass(
      "bg-blue",
      "text-white",
      "border-blue",
      "focus:bg-blue-active",
      "focus:border-blue-active",
      "focus:text-white-active",
      "hover:bg-blue-active",
      "hover:border-blue-active",
      "hover:text-white-active"
    );
    expect(screen.getByTestId("button-wrapper")).toHaveClass(
      "font-bold",
      "px-4",
      "py-1"
    );
  });

  test("it should render a custom  given tag with default tag and label", () => {
    render(
      <Router history={history}>
        <Button component={Link} to='/path/to/hell'>
          Label
        </Button>
      </Router>
    );
    expect(screen.queryByRole("button")).toBeNull();
    expect(screen.getByRole("link", { name: "Label" })).toHaveAttribute(
      "href",
      "/path/to/hell"
    );
  });

  test("it should render a disabled component", () => {
    render(<Button disabled={true}>Label</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveClass(
      "bg-gray-light",
      "text-white",
      "border-gray-light",
      "focus:bg-gray-light-active",
      "focus:border-gray-light-active",
      "focus:text-white-active",
      "hover:bg-gray-light-active",
      "hover:border-gray-light-active",
      "hover:text-white-active"
    );
  });

  test("it should render button with customer color", () => {
    render(
      <Button
        bgColor='red'
        borderColor='yellow'
        color='black'
        fontWeight='lighter'
        paddingX={2}
        paddingY={3}
      >
        Label
      </Button>
    );
    expect(screen.getByRole("button")).toHaveClass(
      "bg-red",
      "text-black",
      "border-yellow",
      "focus:bg-red-active",
      "focus:border-yellow-active",
      "focus:text-black-active",
      "hover:bg-red-active",
      "hover:border-yellow-active",
      "hover:text-black-active"
    );
    expect(screen.getByTestId("button-wrapper")).toHaveClass(
      "font-lighter",
      "px-2",
      "py-3"
    );
  });
});
