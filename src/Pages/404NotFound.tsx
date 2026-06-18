import { AppShell, Box, Text } from "@mantine/core";
import RasioBotao from "../Components/RasioBotao";
import Cabecalho from "../Components/Cabecalho";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogin");

    navigate("/login", { replace: true });
  };
  return (
    <AppShell
      padding="lg"
      withBorder={false}
      header={{ height: isMobile ? 82.5 : 110 }}
    >
      <AppShell.Header>
        <Cabecalho />
      </AppShell.Header>
      <AppShell.Main>
        <Box h="100vh">
          <Text>404 - Página não encontrada</Text>
          <Box>
            <RasioBotao onClick={handleLogout} mt={20}>
              Voltar para a página inicial
            </RasioBotao>
          </Box>
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default NotFound;
