import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.name
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequireAuth;