import { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {

    const token = localStorage.getItem("token");
    const location = useLocation();
    
            if (!token) {
            return <Navigate to="/login" state={{ from: location}} replace/>;
        } else {
            
            return children;
        }
    
}

export default PrivateRoute;