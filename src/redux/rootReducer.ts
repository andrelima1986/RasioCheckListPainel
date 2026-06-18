import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../redux/slices/loginSlice";
import usuarioReducer from "../redux/slices/usuarioSlice";

const slices = {
    login: loginReducer,
    usuario: usuarioReducer
};

export const rootReducer = combineReducers(slices);