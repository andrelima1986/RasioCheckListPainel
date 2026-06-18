import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/loginthunk";
import { UsuarioLogadoDTO } from "../../models/dto";

interface LoginState {
  token: string | null;
  login: string | null;
  usuario: UsuarioLogadoDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  token: localStorage.getItem("token"),
  login: localStorage.getItem("login"),
  usuario: localStorage.getItem("usuario")
    ? JSON.parse(localStorage.getItem("usuario")!)
    : null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.login = null;
      state.usuario = null;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("login");
      localStorage.removeItem("usuario");
    },
  },

  extraReducers: (builder) => {
    builder
      // ✅ PENDING
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ FULFILLED
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        if (!action.payload.dados) return;

        state.token = action.payload.dados.token;
        state.login = action.payload.dados.login;
        state.usuario = action.payload.dados.usuario;

        localStorage.setItem("token", action.payload.dados.token);
        localStorage.setItem("login", action.payload.dados.login);

        // ✅ correto: salvar objeto inteiro
        localStorage.setItem(
          "usuario",
          JSON.stringify(action.payload.dados.usuario)
        );
      })

      // ✅ REJECTED
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

       
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;