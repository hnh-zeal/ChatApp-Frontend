import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Stack, Typography } from "@mui/material";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const Login = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        {/* Login To Talkspire */}
        <Typography variant="h4">Login to TalkSpire</Typography>

        {/* New User? */}
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2"> New User? </Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create an account
          </Link>
        </Stack>

        {/* Login Form */}
        <LoginForm />

        {/* Auth Social */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Login;
