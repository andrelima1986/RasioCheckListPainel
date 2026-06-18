import { Select, SelectProps } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import { rasioCoresThemes } from "../themes";


interface IRasioSelect extends Omit<SelectProps, "onChange"> {
  onChange?: (value: string | null) => void;
  error?: string;
  triggerError?: boolean;
}

const RasioSelect = ({
  onChange,
  placeholder,
  radius = 10,
  required,
  error,
  triggerError,
  readOnly,
  ...props
}: IRasioSelect) => {
  const { focused, ref: focusRef } = useFocusWithin();

  return (
    <Select
      ref={focusRef}
      {...props}
      onChange={onChange}
      placeholder={placeholder}
      radius={radius}
      required={required}
      readOnly={readOnly}
      error={error}
      
      styles={{
        input: {
          borderColor:
            triggerError || !!error
              ? rasioCoresThemes.vermelho
              : focused
              ? rasioCoresThemes.cinzaEscuro
              : rasioCoresThemes.cinzaGrafite,
        },
        option: { 
          backgroundColor: rasioCoresThemes.branco,
          color: rasioCoresThemes.preto,
        }

      }}
    />
  );
};

export default RasioSelect;
