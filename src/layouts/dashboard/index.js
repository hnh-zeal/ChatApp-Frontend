import React from "react";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
