"use client";

import { useCallback, useMemo, useState } from "react";
import {
  contactFieldValidators,
  type ContactFormValues,
} from "../helpers/validateContactForm";

export function useContactField(
  field: keyof ContactFormValues,
  showErrors: boolean,
) {
  const [input, setInput] = useState({ value: "", touched: false });

  const error = useMemo(
    () => contactFieldValidators[field](input.value),
    [field, input.value],
  );
  const status = useMemo(
    () =>
      (input.touched || showErrors) && error
        ? { type: "error" as const, message: error }
        : undefined,
    [input.touched, showErrors, error],
  );
  const onChange = useCallback((value: string) => {
    setInput({ value, touched: true });
  }, []);

  return {
    value: input.value,
    onChange,
    status,
    isValid: !error,
  };
}
