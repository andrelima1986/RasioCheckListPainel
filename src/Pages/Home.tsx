import { Anchor, AppShell, Box, Flex, Grid, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { UsuarioDTO } from "../models/dto";
import { useEffect, useState } from "react";
import { LoginModel } from "../models/loginModel";
import { rasioCoresThemes, rasioTipografiasThemes} from "../themes";
import { useHover, useMediaQuery } from "@mantine/hooks";
import Cabecalho from "../Components/Cabecalho";


const Home = () => {
    
    const isMobile = useMediaQuery("(max-width: 768px)");
    const navigate = useNavigate();
    const location = useLocation();
    const { hovered, ref } = useHover();

    const [itemHovered, setItemHovered] = 
    useState<"usuarios"|
               "perfis"|
               "checklists"|
               "dashboards"|
               "configuracoes"
               |null
               >(null);

    const usuarioLogado: LoginModel = location.state?.token;
    const usuarioLogin: UsuarioDTO | null = location.state;

    let hover = hovered ? rasioCoresThemes.cinzaMuitoClaro : rasioCoresThemes.preto;

          const heading = isMobile
        ? rasioTipografiasThemes.h4?.fontSize
        : rasioTipografiasThemes.h3?.fontSize;
    
      const title = isMobile
        ? rasioTipografiasThemes.h5?.fontSize
        : rasioTipografiasThemes.h4?.fontSize;
    


  useEffect(() => {
    if (usuarioLogin && usuarioLogado) {
      localStorage.setItem("usuarioLogin", JSON.stringify(usuarioLogin));
    }
   }, [usuarioLogin, usuarioLogado])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioLogin");

        navigate("/login", { replace: true });
        
    };

    const handleUsuarios = () => {
      if(usuarioLogado){
        navigate("/usuarios" , { replace: true });
      } else {
        navigate("/login" , { replace: true });
      }
    }

    const handlePerfis = () => {
      if(usuarioLogado){
        navigate("/perfis" , { replace: true });
      } else {
        navigate("/login" , { replace: true });
      }
    }

    const handleCheckLists = () => {
      if(usuarioLogado){
        navigate("/checklists" , { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }

    const handleDashboards = () => {
      if(usuarioLogado){
        navigate("/dashboards", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }

      const handleConfiguracoes = () => {
      if(usuarioLogado){
        navigate("/configuracoes");
      } else {
        navigate("/login");
      }
    }

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
            <Flex 
            align={"flex-end"} 
            direction={"column"}
            >
            <Text ta={"end"}>Bem vindo(a) ao Rasio Operacional, 
              <Text fw={"bold"}>{usuarioLogin?.usuarioNomeCompleto}
                </Text>
                </Text>
            <Box ref={ref}>

            <Anchor
                underline="never"
                onClick={handleLogout} 
            >
                 <Text 
                 c={hover}
                 >Fazer logout</Text>
            </Anchor>
            </Box>

            </Flex>
          
               

                <Grid                
                w="100%"
                bg={rasioCoresThemes.cinzaMuitoMaisClaro} 
                py={15}
                px={10}
                ta={"center"} 
                mt={15.5}
                style={{
                  borderRadius: 8,
                  borderColor: rasioCoresThemes.cinzaEscuro,
                  borderWidth: 1
                }}
                >
                  <Grid.Col 
                  
                  style={{
                    cursor: "pointer"
                  }} 
                  span={2}
                  onMouseEnter={() => setItemHovered("usuarios")}
                  onMouseLeave={() => setItemHovered(null)}
                  onClick={handleUsuarios}
                  >
                      <Text 
                      size={rasioTipografiasThemes.p12}
                      c={
                        itemHovered === "usuarios" 
                        ?  
                        rasioCoresThemes.cinzaMuitoClaro 
                        : rasioCoresThemes.preto
                      }
                      >
                        Cadastro de Usuário
                      </Text>
                  </Grid.Col>
                  <Grid.Col 
                  span={"auto"}
                  onMouseEnter={() => setItemHovered("perfis")}
                  onMouseLeave={() => setItemHovered(null)}
                  style={{
                    cursor: "pointer"
                  }} 
                  onClick={handlePerfis}
                  >
                      <Text 
                      size={rasioTipografiasThemes.p12}
                       c={
                        itemHovered === "perfis" 
                        ?  
                        rasioCoresThemes.cinzaMuitoClaro 
                        : rasioCoresThemes.preto
                      }
                      >Perfis e Permissões</Text>
                  </Grid.Col>
                  <Grid.Col 
                  span={"auto"}
                  onMouseEnter={() => setItemHovered("checklists")}
                  onMouseLeave={() => setItemHovered(null)}
                  style={{
                    cursor: "pointer"
                  }} 
                  onClick={handleCheckLists}
                  >
                      <Text 
                      size={rasioTipografiasThemes.p12}
                       c={
                        itemHovered === "checklists" 
                        ?  
                        rasioCoresThemes.cinzaMuitoClaro 
                        : rasioCoresThemes.preto
                      }
                      >Check-list</Text>
                  </Grid.Col>
                  <Grid.Col 
                  span={"auto"}
                  onMouseEnter={() => setItemHovered("dashboards")}
                  onMouseLeave={() => setItemHovered(null)}
                  style={{
                    cursor: "pointer"
                  }} 
                  onClick={handleDashboards}
                  >
                      <Text 
                      size={rasioTipografiasThemes.p12}
                       c={
                        itemHovered === "dashboards"
                        ?  
                        rasioCoresThemes.cinzaMuitoClaro 
                        : rasioCoresThemes.preto
                      }
                      >Dashboards</Text>
                  </Grid.Col>
                  <Grid.Col 
                  span={"auto"}
                  onMouseEnter={() => setItemHovered("configuracoes")}
                  onMouseLeave={() => setItemHovered(null)}
                  style={{
                    cursor: "pointer"
                  }} 
                  onClick={handleConfiguracoes}
                  >
                      <Text 
                      size={rasioTipografiasThemes.p12}
                       c={
                        itemHovered === "configuracoes" 
                        ?  
                        rasioCoresThemes.cinzaMuitoClaro 
                        : rasioCoresThemes.preto
                      }
                      >Configurações do Sistema</Text>
                  </Grid.Col>
                </Grid>
               
            
            
        </AppShell.Main>
      </AppShell>  
    );
};

export default Home;