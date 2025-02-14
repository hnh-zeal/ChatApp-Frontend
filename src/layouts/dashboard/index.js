import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import { useDispatch, useSelector } from "react-redux";
import { FetchUserProfile, showSnackbar } from "../../redux/slices/app";
import {
  FetchConversations,
  FetchCurrentMessages,
  SelectConversation,
  SetCurrentContact,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import {
  AddConversation,
  AddDirectMessage,
} from "../../redux/slices/conversation";
import AudioCallNotification from "../../sections/dashboard/Audio/CallNotification";
import VideoCallNotification from "../../sections/dashboard/Video/CallNotification";
import {
  PushToAudioCallQueue,
  UpdateAudioCallDialog,
} from "../../redux/slices/audioCall";
import AudioCallDialog from "../../sections/dashboard/Audio/CallDialog";
import VideoCallDialog from "../../sections/dashboard/Video/CallDialog";
import {
  PushToVideoCallQueue,
  UpdateVideoCallDialog,
} from "../../redux/slices/videoCall";
import SideBar from "./SideBar";
import { connectSocket, socket } from "../../socket";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();

  const { isLoggedIn, user_id } = useSelector((state) => state.auth);

  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state) => state.audioCall
  );
  const { open_video_notification_dialog, open_video_dialog } = useSelector(
    (state) => state.videoCall
  );

  const handleCloseAudioDialog = () => {
    dispatch(UpdateAudioCallDialog({ state: false }));
  };
  const handleCloseVideoDialog = () => {
    dispatch(UpdateVideoCallDialog({ state: false }));
  };

  useEffect(() => {
    connectSocket(user_id);
    dispatch(FetchUserProfile());
  }, [dispatch, user_id]);

  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation.chat
  );

  useEffect(() => {
    if (isLoggedIn) {
      // window.onload = function () {
      //   if (!window.location.hash) {
      //     window.location = window.location + "#loaded";
      // window.location.reload();
      //   }
      // };

      // window.onload();


      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("audio_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToAudioCallQueue(data));
      });

      socket.on("video_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushToVideoCallQueue(data));
      });

      socket.on("new_message", (data) => {
        socket.emit("get_conversations", { user_id }, (conversation_data) => {
          if (conversation_data.length === 0) {
            dispatch(AddConversation({ conversation: data.conversation }));
          } else {
            dispatch(FetchConversations({ conversations: conversation_data }));
          }
        });

        // check if msg we got is from currently selected conversation
        const message = data.message;
        if (current_conversation?.id === data.conversation._id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      socket.on("open_chat", ({ new_chat, contact }) => {
        const existing_conversation = conversations.find((el) => el?.id === new_chat._id);
        
        dispatch(existing_conversation
          ? SelectConversation({ room_id: new_chat._id })
          : SetCurrentConversation({ conversation: new_chat })
        );
      
        dispatch(FetchCurrentMessages({ messages: new_chat.messages }));
        dispatch(SetCurrentContact({ contact }));
      });      

      socket.on("new_friend_request", (data) => {
        console.log("Value", data);
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New friend request received",
          })
        );
      });

      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Friend Request Accepted",
          })
        );
      });

      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
    }

    // Remove event listener on component unmount
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request_sent");
      socket?.off("open_chat");
      socket?.off("new_message");
      socket?.off("audio_call_notification");
    };
  }, [isLoggedIn, dispatch, conversations, current_conversation, user_id]);

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row">
        {isDesktop && (
          // SideBar
          <SideBar />
        )}

        <Outlet />
      </Stack>
      {open_audio_notification_dialog && (
        <AudioCallNotification open={open_audio_notification_dialog} />
      )}
      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_video_notification_dialog && (
        <VideoCallNotification open={open_video_notification_dialog} />
      )}
      {open_video_dialog && (
        <VideoCallDialog
          open={open_video_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )}
    </>
  );
};

export default DashboardLayout;
