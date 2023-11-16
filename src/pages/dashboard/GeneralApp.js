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
  const { current_conversation } = useSelector(
    (state) => state.conversation.chat
  );
  const { current_contact } = useSelector((state) => state.conversation);

  return (
    <Stack direction={"row"} sx={{ width: "calc(100vw - 100px)" }}>
      {/* Chats */}
      <Chats />

      {/* Conversation */}
      {current_conversation ? <Conversation /> : <NoChat />}

      {/* Contact */}
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact key="0" {...current_contact}/>;
            case "STARRED":
              return <StarredMessages key="1" />;
            case "SHARED":
              return <SharedMessages key="2" />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
