import { useMemo } from "react";

export const useCreateDataAttribute = (
  prefix: string,
  attributes: Record<string, any> | ""
) => {
  return useMemo(() => {
    if (!attributes) return {};
    return Object.fromEntries(
      Object.entries(attributes)
        .filter(([_, value]) => value !== undefined && value !== "")
        .map(([key, value]) => [`data-${prefix}-${key}`, value])
    );
  }, [prefix, attributes]);
};

export const useComposeAttributes = (
  ...attributeObjects: (Record<string, any> | null)[]
) => {
  return useMemo(() => {
    return Object.assign({}, ...attributeObjects.filter((obj) => obj !== null));
  }, [attributeObjects]);
};
