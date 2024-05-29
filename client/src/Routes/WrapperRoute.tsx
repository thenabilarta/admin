/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from "../pages/Layout";
import { Outlet } from "react-router-dom";

const WrapperRoute = () => {
  return <Layout Children={<Outlet />} />;
};

export default WrapperRoute;
