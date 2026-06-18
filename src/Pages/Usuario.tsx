import { 
  Anchor, 
  AppShell, 
  Box,  
  InputLabel, 
  Modal, 
  Table, 
  Text 
} from "@mantine/core";
import Cabecalho from "../Components/Cabecalho";
import { 
  useDisclosure, 
  useHover, 
  useMediaQuery 
} from "@mantine/hooks";

import { 
  useEffect, 
  useState 
} from "react";
import { UsuarioDTO, UsuarioLogadoDTO } from "../models/dto";
import { useNavigate } from "react-router-dom";
import { rasioCoresThemes, rasioTipografiasThemes } from "../themes";

import LapisAlterar from "../Components/Icones/LapisAlterar";
import CaseExcluir from "../Components/Icones/CaseExcluir";

import RasioActionButton from "../Components/RasioActionButton";
import RasioInput from "../Components/Inputs/RasioInput";
import RasioSelect from "../Components/RasioSelect";
import RasioBotao from "../Components/RasioBotao";
import RasioInputSenha from "../Components/Inputs/RasioInputSenha";
import RasioSwitch from "../Components/RasioSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { listarUsuarioThunk } from "../redux/thunks/usuarioThunk";

const Usuario = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, usuario } = useSelector((state: RootState) => state.login);
  const { hovered, ref } = useHover();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [usuarioListado, setUsuarioListado] = useState<UsuarioDTO[]>([]);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );
  const [message, setMessage] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
 

  let hover = hovered
    ? rasioCoresThemes.cinzaMuitoClaro
    : rasioCoresThemes.preto;


  const mostrarUsuarios = async () => {
    try {
      const usuarios = await dispatch(listarUsuarioThunk()).unwrap();

      console.log(usuarios);

      if (usuarios.sucesso && usuarios.dados) {
        setUsuarioListado(usuarios.dados);
        setMessageType("success");
        return;
      }

      setMessage(usuarios.mensagem);
      setMessageType("error");
    } catch (error: any) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  const formatarCPF = (valor: string) => {
  return valor
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

 
//  const listarPorCpf = () => {

//   }

//   const listarPorEmail = () => {

//   }

//   const criarNovoUsuario = () => {

//   }

//   const alterarUsuarioCadastrado = () => {

//   }

//   const excluirUsuarioCadastrado = () => {

//   }


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioLogin");

    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (usuario && token) {
      localStorage.setItem("usuarioLogin", JSON.stringify(usuario));
    }
  }, [usuario, token]);

  useEffect(() => {
    mostrarUsuarios();
  }, []);

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
        <Box ta={"center"} mb={20}>
        <Text 
        size={rasioTipografiasThemes.h5?.fontSize} 
        fw={"bold"}
        >
          Cadastro de Usuário
          </Text>          
        </Box>
        
        <Box display={"flex"} ref={ref} mb={20}>
        <Box display={"initial"}>
        <RasioActionButton onClick={open} />
        </Box>
        <Box>
        <Box>
          <Text>
            Bem vindo(a) ao Rasio Operacional,
            <Text fw={"bold"}>{usuario?.usuarioNomeCompleto}</Text>
          </Text>
            <Box >
            <Anchor underline="never" onClick={handleLogout}>
              <Text c={hover}>Fazer logout</Text>
            </Anchor>
        </Box>

        </Box>
            </Box>    
        </Box>
        
          <Modal 
          size={"xl"}
          opened={opened} 
          onClose={close} 
          title="Adicionar um novo usuário" 
          centered
          >
            <Box 
            p={10}
            style={{
              gap: 8
            }}
            >
            <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              Nome Completo
              </InputLabel>
            <RasioInput 
            />
            </Box>

            <Box
            p={10}
            style={{
              gap: 8
            }}
            >
            <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              CPF
              </InputLabel>
            <RasioInput />
            </Box>

            <Box 
            p={10}
            >
            <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              E-mail
            </InputLabel>
            <RasioInput />
            </Box>

            <Box
            p={10}
            ta={"center"}
            style={{
              alignItems: "center"
            }}
            >
               <RasioSwitch
                  label="Status"
                  size="md"
                />
            </Box>

            <Box 
            p={10}
            >
            <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              Tipo de Check-list
              </InputLabel>
            <RasioSelect />
            </Box>

            <Box 
            p={10}
            >
             <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              Senha
              </InputLabel>
            <RasioInputSenha />
            </Box>

            <Box 
            p={10}
            >
             <InputLabel
            c={rasioCoresThemes.preto}
            style={{
                fontSize: isMobile
                  ? rasioTipografiasThemes.p14
                  : rasioTipografiasThemes.p16,
                fontWeight: rasioTipografiasThemes.fontWeight.regular,
              }}
            >
              Confirmar Senha
              </InputLabel>
            <RasioInputSenha />

            </Box>

           
            <Box
            my={15} 
            ta={"center"}
            >
                <RasioBotao mr={5}>Adicionar</RasioBotao>
                 <RasioBotao>Limpar</RasioBotao>
              </Box>
          </Modal>

        
        <Table >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nome Completo</Table.Th>
              <Table.Th>CPF</Table.Th>
              <Table.Th>E-mail</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Alterar</Table.Th>
              <Table.Th>Excluir</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {usuarioListado.length > 0 ? (
              usuarioListado.map((us) => (
                <Table.Tr key={us.usuarioId}>
                  <Table.Td>{us.usuarioNomeCompleto}</Table.Td>

                  <Table.Td>{formatarCPF(us.usuarioCPF)}</Table.Td>

                  <Table.Td>{us.usuarioEmail}</Table.Td>

                  <Table.Td>{us.usuarioStatus ? "Ativo" : "Inativo"}</Table.Td>

                  <Table.Td>
                    <Box onClick={() => alert("prontinho")}>
                    <LapisAlterar style={{
                      cursor: "pointer"
                    }} 
                    w={20}
                    h={20}
                    />
                    </Box>
                  </Table.Td>

                  <Table.Td >
                    <Box  onClick={() => alert("prontinho")}>
                    <CaseExcluir style={{
                      cursor: "pointer",
                      alignItems: "center"
                    }} 
                    w={20}
                    h={20}
                    />
                    </Box>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text
                    ta="center"
                    c={
                      messageType === "error"
                        ? rasioCoresThemes.vermelho
                        : rasioCoresThemes.verde
                    }
                  >
                    {message}
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </AppShell.Main>
    </AppShell>
  );
};

export default Usuario;
