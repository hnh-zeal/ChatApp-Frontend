import React from "react";
import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import {
  ReplyMsg,
  MediaMsg,
  TextMsg,
  Timeline,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";

const Message = () => {
  return (
    <Box p={2}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              //Timeline
              return <Timeline el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  // img msg
                  return <MediaMsg el={el} />;
                case "doc":
                  // Doc msg
                  return <DocMsg el={el} />;
                case "link":
                  // linke msg
                  return <LinkMsg el={el} />;
                case "reply":
                  // replay msg
                  return <ReplyMsg el={el} />;
                default:
                  //text msg
                  return <TextMsg el={el} />;
              }
            default:
              break;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
