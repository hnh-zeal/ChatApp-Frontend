import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Plus } from "phosphor-react";
// import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import CreateGroup from "../../sections/dashboard/CreateGroup";
import Explore from "../../sections/dashboard/Explore";
import "../../global.css";

const Friends = () => {
  const theme = useTheme();

  const { conversations } = useSelector((state) => state.conversation.chat);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            {/* Groups */}
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Explore Users</Typography>
            </Stack>

            {/* Create New Group */}
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>

            <Divider />

            {/* Group Chat List */}
            <Stack
              className={"scrollbar"}
              sx={{
                flexGrow: 1,
                overflowY: "scroll",
                height: "100%",
              }}
            >
              {/* <SimpleBarStyle timeout={500} clickOnTrack={false}> */}
              <Stack spacing={2.4}>
                <Stack spacing={2}>
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Pinned
                  </Typography>

                  {/* Chat List */}
                  {conversations.filter((el) => el.pinned).map((el, index) => {
                    return <ChatElement {...el} key={index}/>;
                  })}

                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    All Groups
                  </Typography>
                  {conversations.filter((el) => !el.pinned).map((el, index) => {
                    return <ChatElement {...el} key={index}/>;
                  })}
                </Stack>
              </Stack>
              {/* </SimpleBarStyle> */}
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        <Explore />
      </Stack>
      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Friends;
