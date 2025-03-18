import { renderHook } from "@testing-library/react";
import { useCreateDataAttribute, useComposeAttributes } from ".";

test("attributes are created and applied", () => {
  const { result: dataAttributes } = renderHook(() =>
    useCreateDataAttribute("button", { variant: "primary", size: "large" })
  );

  const { result: accentAttributes } = renderHook(() =>
    useCreateDataAttribute("accent", { color: "red" })
  );

  const { result: composedAttributes } = renderHook(() =>
    useComposeAttributes(dataAttributes.current, accentAttributes.current)
  );

  expect(composedAttributes.current).toEqual({
    "data-button-variant": "primary",
    "data-button-size": "large",
    "data-accent-color": "red",
  });
});

  test("attributes are created and applied", () => {
    const { result: dataAttributes } = renderHook(() =>
      useCreateDataAttribute("button", { variant: undefined, size: "large" })
    );
  
    const { result: accentAttributes } = renderHook(() =>
      useCreateDataAttribute("accent", { color: "" })
    );
  
    const { result: composedAttributes } = renderHook(() =>
      useComposeAttributes(dataAttributes.current, accentAttributes.current)
    );
  
    expect(composedAttributes.current).toEqual({
      "data-button-size": "large",
      
    });
  })
  

