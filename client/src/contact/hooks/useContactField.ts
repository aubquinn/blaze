"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  contactFieldValidators,
  type ContactFormValues,
} from "../helpers/validateContactForm";

const VALIDATION_DELAY_MS = 350;

export function useContactField(
  field: keyof ContactFormValues,
  showErrors: boolean,
) {
  const [input, setInput] = useState({ value: "", touched: false });
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedInput(input);
    }, VALIDATION_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [input]);

  const error = useMemo(
    () => contactFieldValidators[field](debouncedInput.value),
    [field, debouncedInput.value],
  );
  const isValidationPending = input !== debouncedInput;
  const status = useMemo(
    () =>
      !isValidationPending && (debouncedInput.touched || showErrors) && error
        ? { type: "error" as const, message: error }
        : undefined,
    [isValidationPending, debouncedInput.touched, showErrors, error],
  );
  const onChange = useCallback((value: string) => {
    setInput({ value, touched: true });
  }, []);

  return {
    value: input.value,
    onChange,
    status,
    isValid: !isValidationPending && !error,
  };
}
