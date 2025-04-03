import { useRef, useEffect } from "react";

const useFieldRefs = (fields: string[]) => {
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fields.forEach((field) => {
      refs.current[field] = null;
    });
  }, [fields]);

  const setRef = (field: string) => (element: HTMLDivElement | null) => {
    refs.current[field] = element;
  };

  const scrollToError = (errors: Record<string, string>) => {
    const firstErrorField = Object.keys(errors)[0];
    if (refs.current[firstErrorField]) {
      refs.current[firstErrorField]?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return { setRef, scrollToError };
};

export default useFieldRefs;
