import { PasswordInput, PasswordInputProps } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { rasioCoresThemes } from "../../themes";
import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

interface IRasioInputSenha extends PasswordInputProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  radius?: number;
  required?: boolean;
  error?: string;
  triggerError?: boolean;
}

const RasioInputSenha = ({
  value,
  onChange,
  onBlur,
  placeholder,
  radius = 10,
  required,
  error,
  triggerError,
  ...props
}: IRasioInputSenha) => {
  const { focused, ref } = useFocusWithin();
 
  const [, setHighlight] = useState(false);
  const [, setTouched] = useState(false);

  // Marca o campo como "tocado"
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onBlur?.(e);
  };

  
    useEffect(() => {
      if (triggerError) {
        setHighlight(true);
        const timer = setTimeout(() => setHighlight(false), 1500);
        return () => clearTimeout(timer);
      }
    }, [triggerError]);



  return (
    <PasswordInput
      value={value ?? ""}
      onChange={onChange}
      onBlur={handleBlur}
      ref={ref}
      placeholder={placeholder}
      radius={radius}
      required={required}
      {...props}
      styles={() => ({
        input: {
          borderColor:
            triggerError || !!error
              ? rasioCoresThemes.vermelho
              : focused
                ? rasioCoresThemes.cinzaEscuro
                : rasioCoresThemes.cinzaGrafite,
          "::placeholder": {
            color: rasioCoresThemes.cinzaEscuro,
            opacity: 1,
          },
        },
      })}
      error={error}
      />
  );
};

export default RasioInputSenha;
