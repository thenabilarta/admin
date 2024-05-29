import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getUserStateStatus } from "../features/user/userSlice";

const AuthenticationRoute = () => {
  const userState = useAppSelector(getUserStateStatus);

  if (userState.status === "loggedout") {
    return <Outlet />;
  }
  if (userState.status === "loggedin") {
    return <Navigate to="/" />;
  }

  return <></>;
};

export default AuthenticationRoute;
