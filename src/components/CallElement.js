import React from "react";
import { Box, Stack, Avatar, Typography, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import {
  ArrowDownLeft,
  ArrowUpRight,
  VideoCamera,
  Phone,
} from "phosphor-react";
// import { useDispatch } from "react-redux";
import { faker } from "@faker-js/faker";
import StyledBadge from "./StyledBadge";
// import { StartAudioCall } from "../redux/slices/audioCall";
// import { StartVideoCall } from "../redux/slices/videoCall";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../config";

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const CallLogElement = ({ img, name, incoming, missed, online, id }) => {
  const theme = useTheme();

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
          )}

          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
            <Stack spacing={1} alignItems="center" direction={"row"}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "green"} />
              )}
              <Typography variant="caption">Yesterday 21:24</Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Phone and Camera Icons */}
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Phone color="green" />
          <VideoCamera />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const CallElement = ({ online, img, name, id, handleClose }) => {
  // const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar alt={faker.name.fullName()} src={faker.image.avatar()} />
          )}
          <Stack spacing={0.3} alignItems="center" direction={"row"}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              //   dispatch(StartAudioCall(id));
              handleClose();
            }}
          >
            <Phone style={{ color: theme.palette.primary.main }} />
          </IconButton>

          <IconButton
            onClick={() => {
              //   dispatch(StartVideoCall(id));
              handleClose();
            }}
          >
            <VideoCamera style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { CallLogElement, CallElement };
