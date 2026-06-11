import { TextInput, TextInputProps } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { rasioCoresThemes } from "../../themes";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

interface IRasioInput extends TextInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  radius?: number;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  triggerError?: boolean;
}

const RasioInput = ({
  value,
  onChange,
  onBlur,
  placeholder,
  radius = 10,
  readOnly,
  required,
  error,
  triggerError,
  ...props
}: IRasioInput) => {
  const { focused, ref } = useFocusWithin();
  const [, setHighlight] = useState(false);
  const [, setTouched] = useState(false);

  // Marca o campo como "tocado"
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(e);
  };

  // Efeito visual de highlight em caso de erro
  useEffect(() => {
    if (triggerError) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [triggerError]);

  return (
    <TextInput
      ref={ref}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      radius={radius}
      readOnly={readOnly}
      required={required}
      error={error}
      {...props}
      styles={() => ({
        input: {
          borderColor:
            triggerError || !!error
              ? rasioCoresThemes.vermelho
              : focused
                ? rasioCoresThemes.cinzaEscuro
                : rasioCoresThemes.cinzaGrafite,
          transition: "border-color 0.3s ease-in-out",
          backgroundColor: readOnly
            ? rasioCoresThemes.cinzaMuitoMaisClaro
            : undefined,
          "::placeholder": {
            color: rasioCoresThemes.cinzaEscuro,
            opacity: 1,
          },
        },
      })}
    />
  );
};

export default RasioInput;
