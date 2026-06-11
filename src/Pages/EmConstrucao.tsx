import { AppShell, Box, Center, Text } from "@mantine/core";
import RasioBotao from "../Components/RasioBotao";
import Cabecalho from "../Components/Cabecalho";
import { useMediaQuery } from "@mantine/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginModel } from "../models/loginModel";
import { UsuarioDTO } from "../models/dto";
import { useEffect } from "react";

const EmConstrucao = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const isMobile = useMediaQuery("(max-width: 768px)");

    const usuarioLogado: LoginModel = location.state?.token;
    const usuarioLogin: UsuarioDTO | null = location.state;

     useEffect(() => {
        if (usuarioLogin && usuarioLogado) {
          localStorage.setItem("usuarioLogin", JSON.stringify(usuarioLogin));
        }
       }, [usuarioLogin, usuarioLogado])
    

     const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioLogin");

        if (usuarioLogado){
            navigate("/home", { replace: true });
        }else {
            navigate("/login", { replace: true });
        }
        
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

         <Center h="100vh" display={"list-item"}>
        <Text size="xl">
            🚧 Página em construção
        </Text>
        <Box>

        <RasioBotao onClick={handleLogout} mt={20}>
                Voltar para a página inicial
            </RasioBotao>
        </Box>
    </Center>
        </AppShell.Main>
        </AppShell>

    );
}

export default EmConstrucao;