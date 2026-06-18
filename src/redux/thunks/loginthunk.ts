import { createAsyncThunk } from "@reduxjs/toolkit";
import { fazerLogin } from "../../api/usuarioAPI";
import { LoginModel } from "../../models/loginModel";
import { ResponseDTO, UsuarioLogadoDTO } from "../../models/dto";



export interface LoginResponse {
  token: string;
  login: string;
  usuario: UsuarioLogadoDTO;
}


export const loginThunk = createAsyncThunk<
  ResponseDTO<LoginResponse>,
  LoginModel,
  { rejectValue: string }
>(
  "login/fazerLogin",
  async (loginData, { rejectWithValue }) => {
    try {
      const result = await fazerLogin(loginData);

      if (!result.dados?.token) {
        return rejectWithValue(result.mensagem || "Token não retornado");
      }

      return {
        sucesso: result.sucesso,
        mensagem: result.mensagem,
        dados: {
          token: result.dados.token,
          login: loginData.login,
          usuario: {
            usuarioId: result.dados.usuarioId,
            usuarioNomeCompleto: result.dados.usuarioNomeCompleto
          }
        }
      };

    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);