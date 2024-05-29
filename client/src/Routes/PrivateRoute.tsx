import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { getUserStateStatus } from "../features/user/userSlice";
import Layout from "../pages/Layout";

const PrivateRoute = () => {
  const userState = useAppSelector(getUserStateStatus);

  if (userState.status === "loggedout") {
    return <Navigate to="/login" />;
  }
  if (userState.status === "loggedin") {
    return <Layout Children={<Outlet />} />;
  }

  return <></>;
};

export default PrivateRoute;
