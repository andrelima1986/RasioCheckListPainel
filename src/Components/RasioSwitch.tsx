import { Switch, SwitchProps } from "@mantine/core";
import { rasioCoresThemes, rasioTipografiasThemes } from "../themes";

interface IRasioSwitch extends SwitchProps {
  label: string;
  size?: string;
  required?: boolean;
}

const RasioSwitch = ({ label, size, required, ...props }: IRasioSwitch) => {
  return (
    <Switch
      label={label}
      size={size}
      required={required}
      color={rasioCoresThemes.preto}
      {...props}
      style={{
        fontSize: rasioTipografiasThemes.p16,
        fontWeight: rasioTipografiasThemes.fontWeight.medium,
      }}
    />
  );
};

export default RasioSwitch;