import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import { ChatList } from "../../data";
import "../../global.css";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  User,
} from "phosphor-react";
import Friends from "../../sections/dashboard/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchConversations } from "../../redux/slices/conversation";

const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.app);
  // useEffect(() => {
    // socket.emit("get_conversations", { user_id }, (data) => {
    //   dispatch(FetchConversations({ conversations: data }));
    // });
  //   // might add later
  // }, [dispatch]);

  // if (user) {
  //   const all_conversations = user.conversations;
  //   if (all_conversations) {
  //     dispatch(FetchConversations({ conversations: all_conversations }));
  //   }
  // }

  const { conversations } = useSelector((state) => state.conversation.chat);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
          {/* Chats */}
          <Stack
            alignItems={"center"}
            justifyContent="space-between"
            direction="row"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
                sx={{ width: "max-content" }}
              >
                <User />
              </IconButton>
              <IconButton sx={{ width: "max-content" }}>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>

          {/* Search */}
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search.."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>

          {/* Archive */}
          <Stack spacing={1}>
            <Stack direction="row" alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button variant="text">Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            direction="column"
            className={"scrollbar"}
            sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
          >
            {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
            <Stack spacing={2.4}>
              <Stack spacing={2}>
                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })} */}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((el) => !el.pinned)
                  .map((el, index) => {
                    return <ChatElement {...el} key={index}/>;
                  })}
              </Stack>
            </Stack>
            {/* </SimpleBarStyle> */}
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
