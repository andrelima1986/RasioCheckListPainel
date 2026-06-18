import { Image, ImageProps } from "@mantine/core";
import lapisAlterar from "../../assets/Icons/lixeiraExcluir.png";
import { useHover } from "@mantine/hooks";
import { rasioCoresThemes } from "../../themes";

interface ICaseExcluir extends ImageProps {
  width?: number;
  height?: number;
  alt?: string;
}

const CaseExcluir = ({ width, height, alt, ...props }: ICaseExcluir) => {

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

export default CaseExcluir;