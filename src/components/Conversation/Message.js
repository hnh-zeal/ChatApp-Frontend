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

const Message = ({menu}) => {
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
                  return <MediaMsg el={el} menu={menu}/>;
                case "doc":
                  // Doc msg
                  return <DocMsg el={el} menu={menu}/>;
                case "link":
                  // linke msg
                  return <LinkMsg el={el} menu={menu}/>;
                case "reply":
                  // replay msg
                  return <ReplyMsg el={el} menu={menu}/>;
                default:
                  //text msg
                  return <TextMsg el={el} menu={menu}/>;
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
