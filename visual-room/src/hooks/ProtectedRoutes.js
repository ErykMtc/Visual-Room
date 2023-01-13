import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";
  

const ProtectedRoutes = ({allowedRoles}) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log(auth?.roles)
  // console.log(auth)
  // console.log(allowedRoles)

  return (
      auth?.roles?.find(role => allowedRoles?.includes(role))
          ? <Outlet />
          : auth?.accessToken
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
              : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;