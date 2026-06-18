import {AppShell, AppShellMain, Box, Center, Text} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { rasioCoresThemes, rasioTipografiasThemes } from "../themes";
import { useEffect, useState } from "react";
import Cabecalho from "../Components/Cabecalho";
import RasioInput from "../Components/Inputs/RasioInput";
import RasioInputSenha from "../Components/Inputs/RasioInputSenha";
import RasioBotao from "../Components/RasioBotao";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginThunk } from "../redux/thunks/loginthunk";


const Login = () => {

     const isMobile = useMediaQuery("(max-width: 768px)");

     const dispatch = useDispatch<AppDispatch>();

     const { loading, token } = useSelector((state: RootState) => state.login);
     const [login, setLogin] = useState<string>("");
     const [senha, setSenha] = useState<string>("");
     const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
     const [message, setMessage] = useState<string | null>(null);

   
      const navigate = useNavigate();
       const heading = isMobile
    ? rasioTipografiasThemes.h4?.fontSize
    : rasioTipografiasThemes.h3?.fontSize;

  const title = isMobile
    ? rasioTipografiasThemes.h5?.fontSize
    : rasioTipografiasThemes.h4?.fontSize;

      useEffect(() => {
    if (token) {
      navigate("/home");
      // Aqui você pode redirecionar para outra página
    }
  }, [token, navigate]);



    useEffect(() => {
    // Se houver erro ou mensagem
    if (message) {
      const timer = setTimeout(() => {

        setMessage(null);
        setMessageType(null);
      }, 5000); // 5 segundos

      // Limpa o timer caso o estado mude antes de 5s ou o componente desmonte
      return () => clearTimeout(timer);
    }
  }, [message, messageType]);

  const handleLogin = async () => {
  try {
    setMessage(null);
    setMessageType(null);

      const response = await dispatch(loginThunk({login, senha})).unwrap();


      setMessage(response.mensagem);
      setMessageType("success");

 
      setTimeout(() => {
        navigate("/home", {
           // Passa os dados do usuário para a página Home  
          }
        );
      }, 5000);

      return;
    }
   catch (error: any) {
    setMessage(error.message);
    setMessageType("error");
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

      <AppShellMain
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            width: isMobile ? 405 : 540,
          }}
        >
          <Text
            ta="center"
            fw={rasioTipografiasThemes.fontWeight.bold}
            size={heading}
            ff={rasioTipografiasThemes.fontFamily}
            c={rasioCoresThemes.preto}
            mb={50}
          >
            Rasio Operacional - Painel Gerencial
          </Text>

           <Text
            fw={rasioTipografiasThemes.fontWeight.medium}
            size={title}
            ff={rasioTipografiasThemes.fontFamily}
            c={rasioCoresThemes.preto}
          >
            Login
          </Text>

          <RasioInput
             size="lg"
            placeholder="Digite o seu CPF ou E-mail"
            radius={10}
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <Text
            fw={rasioTipografiasThemes.fontWeight.medium}
            size={title}
            ff={rasioTipografiasThemes.fontFamily}
            c={rasioCoresThemes.preto}
          >
            Senha
          </Text>

          <RasioInputSenha
            size="lg"
            placeholder="Digite sua senha"
            radius={10}
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          /> 

          {message && (
            <Text c={messageType === "error" 
            ? rasioCoresThemes.vermelho 
            : rasioCoresThemes.verde 
            } ta={"center"}>
              {message}
            </Text>
          )}

          <Center>
            <RasioBotao
               onClick={handleLogin}
              size="sm"
              w={140}
              h={60}
              mt={30}
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </RasioBotao> 
          </Center>
        </Box>
      </AppShellMain>
    </AppShell>
    );
}

export default Login;