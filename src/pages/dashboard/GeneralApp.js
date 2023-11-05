import React, { useEffect } from "react";
import Chats from "./Chats";
import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Conversation from "./Conversation";
import Contact from "../../sections/dashboard/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChat from "./NoChat";

const GeneralApp = () => {
  const { sideBar } = useSelector((store) => store.app);
  const { chat_type, room_id } = useSelector((store) => store.conversation);
  const { current_conversation } = useSelector(
    (state) => state.conversation.chat
  );

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* Chats */}
      <Chats />

      {/* Conversation */}
      {(room_id !== null && chat_type === "individual") ||
      current_conversation ? (
        <Conversation />
      ) : (
        <NoChat />
      )}

      {/* Contact */}
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
