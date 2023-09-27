import React from "react";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = true;

const DashboardLayout = () => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
