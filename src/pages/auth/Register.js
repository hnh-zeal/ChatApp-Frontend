import React from "react";
import { Stack, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";
import AuthSocial from "../../sections/auth/AuthSocial";

const Register = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        {/* Get Started */}
        <Typography variant="h4">Get Started with TalkSpire</Typography>

        {/* Already have an account? */}
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already have an account?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Sign in
          </Link>
        </Stack>

        {/* Register Form */}
        <RegisterForm />

        {/* Terms and Services */}
        <Typography
          component={"div"}
          sx={{
            color: "text.secondary",
            mt: 3,
            typography: "caption",
            textAlign: "center",
          }}
        >
          {"By Signing up, I agree to "}
          <Link underline="always" color="text.primary">
            Terms of service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy Policy
          </Link>
        </Typography>

        {/* AuthSocial */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default Register;
