import React from "react";
import { Box, Badge, Stack, Avatar, Typography } from "@mui/material";
import { styled, useTheme, alpha } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SelectConversation,
  SetCurrentContact,
} from "../redux/slices/conversation";
import { socket } from "../socket";

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string;
};

const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const ChatElement = ({ id, name, img, msg, time, unread, online, user_id }) => {
  const dispatch = useDispatch();
  const { room_id } = useSelector((state) => state.conversation);

  const selectedChatId = room_id?.toString();

  let isSelected = +selectedChatId === id;

  if (!selectedChatId) {
    isSelected = false;
  }

  const theme = useTheme();

  return (
    <StyledChatBox
      onClick={() => {
        socket.emit(
          "get_current_conversation",
          { conversation_id: id, user_id: user_id },
          (data) => {
            dispatch(SelectConversation({ room_id: id }));
            dispatch(FetchCurrentMessages({ messages: data.messages }));
            dispatch(SetCurrentContact({ contact: data.contact }));
          }
        );
      }}
      sx={{
        width: "100%",

        borderRadius: 1,

        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2}>
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
            <Typography variant="subtitle2">
              {truncateText(name, 15)}
            </Typography>
            <Typography variant="caption">{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {time}
          </Typography>
          <Badge
            className="unread-count"
            color="primary"
            badgeContent={unread}
          />
        </Stack>
      </Stack>
    </StyledChatBox>
  );
};

export default ChatElement;
