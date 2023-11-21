import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Stack, Box } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { ChatHeader, ChatFooter } from "../../components/Chat";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "../../components/Conversation/MsgTypes";

const Conversation = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { current_messages } = useSelector(
    (state) => state.conversation.chat
  );

  useEffect(() => {
    
  }, [dispatch, current_messages]);

  return (
    <Box p={isMobile ? 1 : 3}>
      <Stack spacing={3}>
        {current_messages.map((el, idx) => {
          switch (el.type) {
            case "divider":
              return (
                // Timeline
                <Timeline el={el} key={idx} />
              );

            case "msg":
              switch (el.subtype) {
                case "img":
                  return (
                    // Media Message
                    <MediaMsg el={el} menu={menu} key={idx} />
                  );

                case "doc":
                  return (
                    // Doc Message
                    <DocMsg el={el} menu={menu} key={idx} />
                  );
                case "Link":
                  return (
                    //  Link Message
                    <LinkMsg el={el} menu={menu} key={idx} />
                  );

                case "reply":
                  return (
                    //  ReplyMessage
                    <ReplyMsg el={el} menu={menu} key={idx} />
                  );

                default:
                  return (
                    // Text Message
                    <TextMsg el={el} menu={menu} key={idx} />
                  );
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

const ChatComponent = () => {
  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);
  const { sideBar } = useSelector((store) => store.app);

  const { current_messages, current_conversation } = useSelector(
    (state) => state.conversation.chat
  );

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [current_messages]);

  return (
    <Box
      sx={{
        height: "100%",
        width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 450px)",
      }}
    >
      <Stack
        height={"100%"}
        maxHeight={"100vh"}
        width={isMobile ? "100vw" : "auto"}
      >
        {/* Header */}
        <ChatHeader {...current_conversation} />
        
        <Box
          ref={messageListRef}
          width={"100%"}
          className="scrollbar"
          sx={{
            position: "relative",
            flexGrow: 1,
            overflow: "scroll",

            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Conversation menu={true} isMobile={isMobile} />
        </Box>

        {/* Footer  */}
        <ChatFooter />
      </Stack>
    </Box>
  );
};

export default ChatComponent;

export { Conversation };
