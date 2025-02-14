import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Stack, Typography } from "@mui/material";
import NoChatSVG from "../../assets/Illustration/NoChat";
import { useTheme } from "@mui/material/styles";
import { UpdateTab } from "../../redux/slices/app";
import { styled } from "@mui/material/styles";

const NoChat = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        height: "100%",
        width: "calc(100vw - 420px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        spacing={2}
        sx={{ height: "100%", width: "100%" }}
        alignItems="center"
        justifyContent="center"
      >
        <NoChatSVG />
        <Typography variant="subtitle2" sx={{ display: "inline" }}>
          Select a Conversation or{" "}
          <span
            onClick={() => {
              // Go to the Friends Page
              navigate("/friends");
            }}
            style={{
              color: "blue",
              cursor: "pointer", // Move the ":hover" style to inline style
            }}
          >
            Start a new one
          </span>
        </Typography>
      </Stack>
    </Box>
  );
};

export default NoChat;
