import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  FetchFriendRequests,
  FetchSentRequests,
  UpdateTab,
} from "../redux/slices/app";
import { useTheme, styled } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";
import { socket } from "../socket";
import { Chat } from "phosphor-react";

const user_id = window.localStorage.getItem("user_id");

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const UserElement = ({ img, firstName, lastName, online, _id }) => {
  const dispatch = useDispatch();

  const sendRequest = () => {
    // Emit the "friend_request" event
    socket.emit("friend_request", { to: _id, from: user_id }, () => {
      alert("Request sent");
    });
  };

  // useEffect(() => {
  //   // Dispatch the FetchUsers action
  //   dispatch(FetchUsers());
  // }, [sendRequest]);

  const theme = useTheme();

  const name = `${firstName} ${lastName}`;

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#161c24",
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button onClick={sendRequest}>Send Request</Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendRequestElement = ({
  img,
  firstName,
  lastName,
  online,
  _id,
  id,
}) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;

  const dispatch = useDispatch();

  const acceptRequest = () => {
    // Emit the "accept_request" event
    socket.emit("accept_request", { request_id: id }, () => {
      alert("request sent");
      dispatch(FetchFriendRequests());
    });
  };
  // useEffect(() => {
  //   // Dispatch the FetchUsers action
  // dispatch(FetchFriendRequests());
  // }, [acceptRequest]);

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#161c24",
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button onClick={acceptRequest}>Accept Request</Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const SentRequestElement = ({ img, firstName, lastName, online, _id, id }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  const dispatch = useDispatch();

  const cancelRequest = () => {
    socket.emit("cancel_request", { request_id: id }, () => {
      alert("Request cancelled");
      dispatch(FetchSentRequests());
    });
  };
  // useEffect(() => {
  //   // Dispatch the FetchUsers action
  //   dispatch(FetchSentRequests());
  // }, [cancelRequest]);

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#161c24",
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <Button onClick={cancelRequest}>Cancel Request</Button>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

const FriendElement = ({ img, firstName, lastName, online, _id }) => {
  const theme = useTheme();
  const name = `${firstName} ${lastName}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <StyledChatBox
      sx={{
        width: "100%",
        borderRadius: 1,
        backgroundColor: theme.palette.mode === "light" ? "#FFF" : "#161c24",
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={name} src={img} />
            </StyledBadge>
          ) : (
            <Avatar alt={name} src={img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              // Start a new conversation
              socket.emit("start_conversation", { to: _id, from: user_id });
              navigate("/app");
              dispatch(UpdateTab({ tab: 0 }));
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export { UserElement, FriendRequestElement, SentRequestElement, FriendElement };
