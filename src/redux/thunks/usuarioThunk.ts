import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResponseDTO, UsuarioDTO } from "../../models/dto";
import { criarUsuario, listarTodosUsuarios } from "../../api/usuarioAPI";

export const listarUsuarioThunk = createAsyncThunk<
ResponseDTO<UsuarioDTO[]>, 
void,
{ rejectValue: string }
>("usuario/listar", 
  async(_, { rejectWithValue }) => {
    try {
        const response = await listarTodosUsuarios();

        return {
            sucesso: response.sucesso,
            mensagem: response.mensagem,
            dados: response.dados
        }
    } catch (error: any) {
    return rejectWithValue(error.message);
    }
  });

  export const criarUsuarioThunk = createAsyncThunk
  <ResponseDTO<UsuarioDTO>, 
  UsuarioDTO>( 
    "usuario/criar",
    async(novoUsuario, {rejectWithValue}) => {
        try {
            const response = await criarUsuario(novoUsuario);

              if (!response.sucesso) {
              return rejectWithValue(response.mensagem);
             }

            return {
                sucesso: response.sucesso,
                mensagem: response.mensagem,
                dados: response.dados
            }
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
  );

    
