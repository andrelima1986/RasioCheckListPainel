import {AppShell, AppShellMain, Box, Center, Text} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { rasioCoresThemes, rasioTipografiasThemes } from "../themes";
import { useEffect, useState } from "react";
import Cabecalho from "../Components/Cabecalho";
import RasioInput from "../Components/Inputs/RasioInput";
import RasioInputSenha from "../Components/Inputs/RasioInputSenha";
import RasioBotao from "../Components/RasioBotao";
import { useNavigate } from "react-router-dom";
import { fazerLogin } from "../api/usuarioAPI";
import { LoginModel } from "../models/loginModel";
import { UsuarioDTO } from "../models/dto";


const Login = () => {

     const isMobile = useMediaQuery("(max-width: 768px)");
     const [login, setLogin] = useState<string>("");
     const [senha, setSenha] = useState<string>("");
     const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
     const [message, setMessage] = useState<string | null>(null);

     const token = localStorage.getItem("token");
     const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const usuarioNomeCompleto: UsuarioDTO | null = localStorage.getItem("usuarioLogin")
        ? JSON.parse(localStorage.getItem("usuarioLogin")!).usuarioNomeCompleto
        : null;

       const heading = isMobile
    ? rasioTipografiasThemes.h4?.fontSize
    : rasioTipografiasThemes.h3?.fontSize;

  const title = isMobile
    ? rasioTipografiasThemes.h5?.fontSize
    : rasioTipografiasThemes.h4?.fontSize;

      useEffect(() => {
    if (token) {
      navigate("/home", {
        state: {
          token,
          usuario: {
            usuarioNomeCompleto: usuarioNomeCompleto || "Usuário"
          }
        },
      });
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

    const loginData: LoginModel = {
      login,
      senha,
    };

    const response = await fazerLogin(loginData);

    if (response.sucesso) {
      setMessage(response.mensagem);
      setMessageType("success");

    localStorage.setItem(
    "usuarioLogin",
    JSON.stringify(response.dados)
  );

      setTimeout(() => {
        navigate("/home", {
          state: response.dados, // Passa os dados do usuário para a página Home  
          }
        );
      }, 5000);

      return;
    }

    setMessage(response.mensagem);
    setMessageType("error");

  } catch (error: any) {
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
            placeholder="Digite o seu login"
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