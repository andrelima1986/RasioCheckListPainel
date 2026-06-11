import { Image } from '@mantine/core';
import { useHeadroom, useMediaQuery } from '@mantine/hooks';
import rasioLogo from '../../src/assets/Images/rasio_logo.png';
import { rasioCoresThemes } from '../themes';
import styled from 'styled-components';

const Header = styled.header``;

 const Cabecalho = () => {
  const pinned = useHeadroom({ fixedAt: 60 });
  const isMobile = useMediaQuery('(max-width: 768px)'); // ponto de corte para mobile

  // No formato responsivo, os componentes trabalharão com 25% a menos no formato 'sm'
  return (
    <Header
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: isMobile ? 75 : 100,
        background: rasioCoresThemes.preto,
        transform: `translateY(${pinned ? 0 : '-110px'})`,
        transition: 'transform 400ms ease',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={rasioLogo}
        alt="Logo da Rasio"
        fit="contain"
        width={isMobile ? 135 : 180}
        height={isMobile ? 35 : 54}
      />
    </Header>
  );
}


export default Cabecalho;