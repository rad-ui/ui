export function mergeRefs<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) return;

      try {
        if (typeof ref === "function") {
          ref(value);
        } else {
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      } catch (err) {
        console.error("Error assigning ref", err);
      }
    });
  };
}