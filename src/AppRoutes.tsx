import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import NotFound from "./Pages/404NotFound";
import Home from "./Pages/Home";
import PrivateRoute from "./PrivateRoute";
import EmConstrucao from "./Pages/EmConstrucao";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={ 
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute> 
                    } />
                <Route path="/usuarios" element={
                    <PrivateRoute>
                        <EmConstrucao />
                    </PrivateRoute>
                } />
                <Route path="/perfis" element={
                    <PrivateRoute>
                        <EmConstrucao />
                    </PrivateRoute>
                } />
                 <Route path="/checklists" element={
                    <PrivateRoute>
                        <EmConstrucao />
                    </PrivateRoute>
                } />
                 <Route path="/dashboards" element={
                    <PrivateRoute>
                        <EmConstrucao />
                    </PrivateRoute>
                } />
                 <Route path="/configuracoes" element={
                    <PrivateRoute>
                        <EmConstrucao />
                    </PrivateRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;