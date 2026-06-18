import { ActionIcon, ActionIconProps } from "@mantine/core";
import { rasioCoresThemes } from "../themes";
import Adicionar from "../Components/Icones/Adicionar";
import { MouseEvent } from "react";
import { useHover } from "@mantine/hooks";

interface IRasioActionButton extends ActionIconProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const RasioActionButton = ({onClick, ...props}: IRasioActionButton) => {
    const { hovered, ref } = useHover();
    return (
          <ActionIcon 
          ref={ref}
          {...props}
          radius={"xl"} 
          size={"xl"} 
          bg={rasioCoresThemes.preto}
          onClick={onClick}
          c={hovered ? rasioCoresThemes.cinzaClaro : rasioCoresThemes.preto}
          >
           <Adicionar />
        </ActionIcon>        
    );
}

export default RasioActionButton;