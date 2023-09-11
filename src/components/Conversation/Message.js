import React from "react";
import { Box, Stack } from "@mui/material";
import { Chat_History } from "../../data";
import { TextMsg, Timeline } from "./MsgTypes";

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
                  break;
                case "doc":
                  // Doc msg
                  break;
                case "link":
                  // linke msg
                  break;
                case "reply":
                  // replay msg
                  break;
                default:
                  //text msg
                  return <TextMsg el={el} />;
              }
              break;
            default:
              break;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
