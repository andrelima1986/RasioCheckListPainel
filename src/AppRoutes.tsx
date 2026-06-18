import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/404NotFound";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import EmConstrucao from "./Pages/EmConstrucao";
import Usuario from "./Pages/Usuario";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                      
            localStorage.getItem("token")
            ? <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
                } />
                <Route path="/login" element={<Login />} />
                
                <Route element={<PrivateRoute  />}>
                <Route path="/home"element={<Home />}/>
                <Route path="/usuarios" element={<Usuario />} />
                <Route path="/perfis" element={<EmConstrucao />} />
                 <Route path="/checklists" element={<EmConstrucao />} />
                 <Route path="/dashboards" element={<EmConstrucao />} />
                 <Route path="/configuracoes" element={<EmConstrucao />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;