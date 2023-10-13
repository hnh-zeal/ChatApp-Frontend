import React from "react";
import { Stack, Typography } from "@mui/material";
import VerifyForm from "../../sections/auth/VerifyForm";

const Verify = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Please Verify OTP
        </Typography>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2">
            Sent to email (htetnainghein@innovix-solutions.com)
          </Typography>
        </Stack>
      </Stack>

      {/* VerifyForm */}
      <VerifyForm />
    </>
  );
};

export default Verify;
