import { Button, ButtonProps, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { MouseEvent, useState } from "react";
import { rasioCoresThemes, rasioTipografiasThemes } from "../themes";

interface IRasioBotao extends ButtonProps {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}

const RasioBotao = ({ onClick, type = "button", ...props }: IRasioBotao) => {
  const { hovered, ref } = useHover();
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    if (onClick) onClick(e); // chama o onClick original
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <Button
      type={type as "button" | "submit" | "reset"}
      ref={ref}
      {...props}
      onClick={handleClick}
      style={{
        backgroundColor: clicked
          ? rasioCoresThemes.cinzaClaro
          : hovered
          ? rasioCoresThemes.cinzaEscuro
          : rasioCoresThemes.preto,
        color: rasioCoresThemes.branco,
        ...props.style,
        outline: "none",
      }}
    >
      <Text
        styles={{
          root: {
            fontFamily: rasioTipografiasThemes.fontFamily,
            fontSize: rasioTipografiasThemes.p12,
          },
        }}
      >
        {props.children}
      </Text>
    </Button>
  );
};

export default RasioBotao;
