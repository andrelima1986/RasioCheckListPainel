import { ResponseDTO, UsuarioDTO } from "../models/dto";
import { LoginModel } from "../models/loginModel";
import { UserToken } from "../models/useToken";

const URL_BASE = "http://172.16.3.174:5003/api";

const criarUsuario = async (usuario: UsuarioDTO): 
Promise<ResponseDTO<UsuarioDTO>> => {
    try {
       const token = localStorage.getItem("token"); 
       const response = await fetch(`${URL_BASE}/criarNovoUsuario`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(usuario)
    }
    
);
    const data: ResponseDTO<{usuario: UsuarioDTO; token?:UserToken}> = await response.json();

    if (!response.ok || !data.sucesso || !data.dados?.token) {
     throw new Error(data.mensagem || "Falha ao criar usuário");
    } 

    if (data.dados?.token) {
        localStorage.setItem("token", data.dados.token.token);
    }

    return {     
      sucesso: data.sucesso,
      mensagem: data.mensagem,
      dados: data.dados.usuario
    };
    } catch (error: any) {
         console.error("Erro ao criar operador:", error);
    throw new Error(error.message || "Erro inesperado ao criar operador");
    }
}



export const fazerLogin = async (
  login: LoginModel,
): Promise<ResponseDTO<UserToken>> => {
  try {
    const response = await fetch(`${URL_BASE}/fazerLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
    });

    const text = await response.text();

    const data = text ? JSON.parse(text) : null;

    console.log("RESPOSTA API:", data);

    if (!response.ok) {
      // validação automática ASP.NET
      if (data.errors) {
        const mensagens = Object.values(data.errors).flat().join("\n");

        throw new Error(mensagens);
      }

      // erros customizados
      if (data.mensagem) {
        throw new Error(data.mensagem);
      }

      throw new Error("Erro ao fazer login");
    }

    await localStorage.setItem("token", data.dados.token);

    return {
      sucesso: data.sucesso,
      mensagem: data.mensagem,
      dados: data.dados,
    };
  } catch (error: any) {
    throw new Error(error.message || "Erro inesperado");
  }
};
