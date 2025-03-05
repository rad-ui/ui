import { createDataAttribute, composeAttributes } from ".";
import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "~/components/ui/Button/Button";

describe("createDataAttribute", () => {
    
  test("attributes are created and applied", () => {
    const variant = "primary";
    const size = "large";
    const color = "red";
    
    const dataAttributes = createDataAttribute("button", { variant, size });
    const accentAttributes = createDataAttribute("accent", { color });
    const composedAttributes = composeAttributes(
      dataAttributes,
      accentAttributes
    );
    const Component = () => <Button {...composedAttributes}>Click me</Button>;
    render(<Component />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toHaveAttribute("data-button-variant","primary");
    expect(screen.getByText("Click me")).toHaveAttribute("data-button-size","large");
    expect(screen.getByText("Click me")).toHaveAttribute("data-accent-color","red");
  });

  test("testing for undefined or empty values", () => {
    const variant = "primary";
    const size = undefined;
    const color = "";
    
    const dataAttributes = createDataAttribute("button", { variant, size });
    const accentAttributes = createDataAttribute("accent", { color });
    const composedAttributes = composeAttributes(
      dataAttributes,
      accentAttributes
    );
    const Component = () => <Button {...composedAttributes}>Click me</Button>;
    render(<Component />);

    expect(screen.getByText("Click me")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toHaveAttribute("data-button-variant","primary");
    expect(screen.getByText("Click me")).not.toHaveAttribute("data-button-size");
    expect(screen.getByText("Click me")).not.toHaveAttribute("data-accent-color");
  });
});
