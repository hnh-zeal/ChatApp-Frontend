import React, { useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Fade,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  DotsThreeVertical,
  MagnifyingGlass,
  Phone,
  VideoCamera,
} from "phosphor-react";
import { socket } from "../../socket";
import { useSearchParams } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import {
  ClearCurrent,
  FetchConversations,
} from "../../redux/slices/conversation";
import { ToggleSidebar, showSnackbar } from "../../redux/slices/app";
import { DeleteDialog } from "../../sections/dashboard/Contact";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Conversation_Menu = [
  {
    title: "Contact info",
  },
  {
    title: "Mute notifications",
  },
  {
    title: "Clear messages",
  },
  {
    title: "Delete Conversation",
  },
];

const ChatHeader = ({ id, img, msg, name, online, pinned, time, unread }) => {
  const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const [searchParams, setSearchParams] = useSearchParams();
  const theme = useTheme();
  const [conversationMenu, setConversationMenu] = useState(false);

  const user_id = window.localStorage.getItem("user_id");
  const { current_conversation } = useSelector(
    (state) => state.conversation.chat
  );

  const anchorEl = document.getElementById("conversation-positioned-button");

  const handleClickConversationMenu = () => {
    setConversationMenu((prevconversationMenu) => !prevconversationMenu);
  };

  const handleConversationMenutem = (index) => {
    const data = {
      user_id: user_id,
      conversation_id: current_conversation.id,
    };
    switch (index) {
      case 0:
        console.log("Contact Info");
        break;
      case 1:
        console.log("Mute Notifications");
        break;
      case 2:
        return <DeleteDialog />;
      case 3:
        socket.emit("delete_conversation", data, {
          user_id: user_id,
          conversation_id: current_conversation.id,
        });
        dispatch(ClearCurrent());
        break;

      default:
        break;
    }
  };

  return (
    <Box
      p={2}
      width={"100%"}
      sx={{
        backgroundColor:
          theme.palette.mode === "light" ? "#f8faff" : theme.palette.background,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        alignItems={"center"}
        direction={"row"}
        sx={{ width: "100%", height: "100%" }}
        justifyContent="space-between"
      >
        <Stack
          onClick={() => {
            searchParams.set("open", true);
            setSearchParams(searchParams);
          }}
          spacing={2}
          direction="row"
        >
          <Box>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(ToggleSidebar());
                }}
              >
                <Avatar alt={name} src={img} />
              </StyledBadge>
            ) : (
              <Avatar alt={name} src={img} />
            )}
          </Box>
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">
              {online ? "Online" : "Offline"}{" "}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems="center" spacing={isMobile ? 1 : 3}>
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
          {!isMobile && (
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          )}

          <Divider orientation="vertical" flexItem />
          <IconButton
            id="conversation-positioned-button"
            aria-controls={
              conversationMenu ? "conversation-positioned-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={conversationMenu ? "true" : undefined}
            onClick={handleClickConversationMenu}
          >
            <DotsThreeVertical />
          </IconButton>
          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            TransitionComponent={Fade}
            id="conversation-positioned-menu"
            aria-labelledby="conversation-positioned-button"
            anchorEl={anchorEl}
            open={conversationMenu}
            onClose={handleClickConversationMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box p={1}>
              <Stack spacing={1}>
                {Conversation_Menu.map((el, index) => (
                  <MenuItem
                    onClick={() => handleConversationMenutem(index)}
                    key={index}
                  >
                    <Stack
                      sx={{ minWidth: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>{el.title}</span>
                    </Stack>{" "}
                  </MenuItem>
                ))}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatHeader;
