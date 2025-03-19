import { renderHook } from "@testing-library/react";
import { useCreateDataAttribute, useComposeAttributes } from ".";

/**
 * Test case: Verify that attributes are correctly created and applied.
 */
test("attributes are created and applied", () => {
  // Render the hook for creating data attributes with the prefix "button"
  const { result: dataAttributes } = renderHook(() =>
    useCreateDataAttribute("button", { variant: "primary", size: "large" })
  );

  // Render the hook for creating data attributes with the prefix "accent"
  const { result: accentAttributes } = renderHook(() =>
    useCreateDataAttribute("accent", { color: "red" })
  );

  // Render the hook that merges the two attribute objects into a single object
  const { result: composedAttributes } = renderHook(() =>
    useComposeAttributes(dataAttributes.current(), accentAttributes.current())
  );

  // Assert that the composed attributes object contains the expected `data-*` attributes
  expect(composedAttributes.current()).toEqual({
    "data-button-variant": "primary",
    "data-button-size": "large",
    "data-accent-color": "red",
  });
});

/**
 * Test case: Verify that attributes are correctly created, ignoring undefined or empty values.
 */
test("attributes are created and applied with undefined and empty values", () => {
  // Render the hook with an undefined variant and a defined size
  const { result: dataAttributes } = renderHook(() =>
    useCreateDataAttribute("button", { variant: undefined, size: "large" })
  );

  // Render the hook with an empty string for color (should be ignored)
  const { result: accentAttributes } = renderHook(() =>
    useCreateDataAttribute("accent", { color: "" })
  );

  // Merge the attributes
  const { result: composedAttributes } = renderHook(() =>
    useComposeAttributes(dataAttributes.current(), accentAttributes.current())
  );

  // Assert that only the valid `data-*` attributes are present
  expect(composedAttributes.current()).toEqual({
    "data-button-size": "large", // "variant" is ignored since it's undefined, and "color" is ignored since it's an empty string
  });
});
