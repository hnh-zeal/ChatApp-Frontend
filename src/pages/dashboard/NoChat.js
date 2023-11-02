import React from "react";
import { Stack, Typography } from "@mui/material";
import NoChatSVG from "../../assets/Illustration/NoChat";

const NoChat = () => {
  return (
    <Stack
      spacing={2}
      sx={{ height: "100%", width: "100%" }}
      alignItems="center"
      justifyContent="center"
    >
      <NoChatSVG />
      <Typography variant="subtitle2">
        Select a Conversation or Start a new one
      </Typography>
    </Stack>
  );
};

export default NoChat;
