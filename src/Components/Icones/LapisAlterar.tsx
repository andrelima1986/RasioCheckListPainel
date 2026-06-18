import { Image, ImageProps } from "@mantine/core";
import lapisAlterar from "../../assets/Icons/alterar.png";
import { useHover } from "@mantine/hooks";
import { rasioCoresThemes } from "../../themes";

interface ILapisAlterar extends ImageProps {
  width?: number;
  height?: number;
  alt?: string;
}

const LapisAlterar = ({ width, height, alt, ...props }: ILapisAlterar) => {

    const { hovered, ref } = useHover();
    return (
        <Image 
        {...props}
        ref={ref}
        src={lapisAlterar}
        width={width}
        height={height}
        alt={alt}
        color={hovered ? rasioCoresThemes.cinzaClaro : rasioCoresThemes.preto}
        />
    );
}

export default LapisAlterar;