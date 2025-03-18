import { useCreateDataAttribute, useComposeAttributes } from ".";
import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "~/components/ui/Button/Button";

describe("createDataAttribute", () => {
    
  test("attributes are created and applied", () => {
    const variant = "primary";
    const size = "large";
    const color = "red";
    
    const dataAttributes = useCreateDataAttribute("button", { variant, size });
    const accentAttributes = useCreateDataAttribute("accent", { color });
    const composedAttributes = useComposeAttributes(
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

});
