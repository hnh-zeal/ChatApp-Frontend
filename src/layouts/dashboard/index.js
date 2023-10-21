import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { SelectConversation, showSnackbar } from "../../redux/slices/app";
import { UpdateConversation, AddConversation } from "../../redux/slices/conversation";

const DashboardLayout = () => {
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { conversations } = useSelector((state) => state.conversation.chat);

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      // window.location.reload();

      if (!socket) {
        connectSocket(user_id);
      }

      // "new_friend_request"
      socket.on("new_friend_request", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      // "request_accepted"
      socket.on("request_accepted", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      // request_sent
      socket.on("request_sent", (data) => {
        dispatch(
          showSnackbar({
            severity: "success",
            message: data.message,
          })
        );
      });

      // Start Conversation
      socket.on("start_chat", (data) => {
        console.log("Data", data);
        const existing_conversation = conversations.find(
          (el) => el.id === data._id
        );

        if (existing_conversation) {
          // 
          dispatch(UpdateConversation({conversation: data}));
        } else {
          // add a new conversation to the list
          dispatch(AddConversation({conversation: data}));
        }

        dispatch(SelectConversation({room_id: data._id}));
      });

      return () => {
        socket?.off("new_friend_request");
        socket?.off("request_accepted");
        socket?.off("request_sent");
        socket?.off("start_chat");
      };
    }
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
