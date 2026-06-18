import { createSlice } from "@reduxjs/toolkit";
import { UsuarioDTO } from "../../models/dto"
import { listarUsuarioThunk } from "../thunks/usuarioThunk"

interface UsuarioState {
    usuarios: UsuarioDTO[];
    usuarioSelecionado: UsuarioDTO | null;
    loading: boolean;
    error: string | null;
    mensagem: string | null;
}

const initialState: UsuarioState = {
    usuarios: [],
    usuarioSelecionado: null,
    loading: false,
    error: null,
    mensagem: null
}

const usuarioSlice = createSlice({
    name:"usuario",
    initialState,

    reducers: {
        limparUsuarioSelecionado(state){
            state.usuarioSelecionado = null;
        },

        limparUsuario(state){
            state.error = null;
            state.mensagem = null;
        }
    },
    extraReducers(builder) {
        builder
         .addCase(listarUsuarioThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(listarUsuarioThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarios = action.payload.dados!;
      })

      .addCase(listarUsuarioThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Erro";
      });

        }
    },
);

export const { limparUsuarioSelecionado, limparUsuario } = usuarioSlice.actions;
export default usuarioSlice.reducer;