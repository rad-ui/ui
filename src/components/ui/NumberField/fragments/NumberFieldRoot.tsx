import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { useControllableState } from "~/core/hooks/useControllableState";
import NumberFieldContext from "../contexts/NumberFieldContext";
import { customClassSwitcher } from "~/core";
import clsx from "clsx";

const COMPONENT_NAME = "NumberField";

export type NumberFieldRootElement = ElementRef<"div">;
export type NumberFieldRootProps = {
  name?: string;
  defaultValue?: number | "";
  value?: number | "";
  onValueChange?: (value: number | "") => void;
  step?: number;
  largeStep?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  locale?: string;
} & ComponentPropsWithoutRef<"div">;

const NumberFieldRoot = forwardRef<
  NumberFieldRootElement,
  NumberFieldRootProps
>(
  (
    {
      children,
      name,
      defaultValue = "",
      value,
      onValueChange,
      largeStep,
      step = 1,
      min,
      max,
      disabled,
      readOnly,
      required,
      id,
      className,
      locale,
      ...props
    },
    ref,
  ) => {
    const rootClass = customClassSwitcher(className, COMPONENT_NAME);
    const [inputValue, setInputValue] = useControllableState<number | "">(
      value,
      defaultValue,
      onValueChange,
    );

    const getDecimalSeparator = (locale: string) => {
      const parts = new Intl.NumberFormat(locale).formatToParts(1234.5);
      return parts.find((part) => part.type === "decimal")?.value || ".";
    };

    const handleOnChange = (val: string) => {
      if (val === "") {
        setInputValue("");
        return;
      }

      const decimal = getDecimalSeparator(locale || "en-US");
      const regex = new RegExp(`[^0-9${decimal}]`, "g");
      const cleaned = val.replace(regex, "");
      const normalized = cleaned.replace(decimal, ".");
      const numericValue = parseFloat(normalized);

      if (isNaN(numericValue)) {
        return;
      }

      if (max !== undefined && numericValue > max) {
        setInputValue(max);
        return;
      }

      if (min !== undefined && numericValue < min) {
        setInputValue(min);
        return;
      }

      setInputValue(numericValue);
    };
    const applyStep = (amount: number) => {
      setInputValue((prev) => {
        let temp = prev;
        if (temp === "") {
          if (min !== undefined) {
            temp = min;
          } else {
            temp = 0;
          }
        }
        const nextValue = temp + amount;

        if (max !== undefined && nextValue > max) {
          return max;
        }

        if (min !== undefined && nextValue < min) {
          return min;
        }

        return nextValue;
      });
    };

    const handleStep = ({
      type,
      direction,
    }: {
      type: "small" | "large";
      direction: "increment" | "decrement";
    }) => {
      let amount = 0;

      switch (type) {
        case "small":
          if (!step) {
            return;
          }
          amount = step;
          break;
        case "large":
          if (!largeStep) return;
          amount = largeStep;
          break;
      }

      if (direction === "decrement") {
        amount *= -1;
      }

      applyStep(amount);
    };

    const formattedValue = new Intl.NumberFormat(locale ? locale : "en-US", {
      maximumFractionDigits: 20,
    }).format(inputValue === "" ? 0 : inputValue);

    const contextValues = {
      inputValue,
      formattedValue,
      locale,
      handleOnChange,
      handleStep,
      id,
      name,
      disabled,
      readOnly,
      required,
      rootClass,
    };

    return (
      <div
        ref={ref}
        className={clsx(`${rootClass}-root`, className)}
        {...props}
      >
        <NumberFieldContext.Provider value={contextValues}>
          {children}
        </NumberFieldContext.Provider>
      </div>
    );
  },
);

NumberFieldRoot.displayName = COMPONENT_NAME;

export default NumberFieldRoot;

