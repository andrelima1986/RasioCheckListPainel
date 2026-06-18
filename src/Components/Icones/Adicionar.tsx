import { Image, ImageProps } from "@mantine/core";
import adicionar from "../../assets/Icons/adicionar.png";


interface IAdicionar extends ImageProps {
  width?: number;
  height?: number;
  alt?: string;
 
}

const Adicionar = ({ width, height, alt, ...props }: IAdicionar) => {

    return (
        <Image 
        {...props}
        src={adicionar}
        width={width}
        height={height}
        alt={alt}
        />
    );
}

export default Adicionar;