import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  chat_type: null,
  room_id: null,
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversations(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );
        var last_msg =
          el.messages.length > 0 ? el.messages.slice(-1)[0].text : "";
        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          // img: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
          img: user?.avatar,
          msg: last_msg,
          time: "9:36",
          unread: 0,
          pinned: false,
          about: user?.about || "",
        };
      });
      state.chat.conversations = list;
    },
    updateConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.chat.current_conversation = state.chat.conversations.filter(
        (el) => el?.id === this_conversation._id
      );
    },
    addConversation(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      var last_msg =
        this_conversation.messages.length > 0
          ? this_conversation.messages.slice(-1)[0].text
          : "";
      state.chat.conversations.push({
        id: this_conversation._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: user?.avatar,
        msg: last_msg || "",
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },
    fetchCurrentMessages(state, action) {
      const user_id = window.localStorage.getItem("user_id");

      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) => ({
        id: el._id,
        type: "msg",
        subtype: el.type,
        message: el.text,
        incoming: el.to === user_id,
        outgoing: el.from === user_id,
      }));
      state.chat.current_messages = formatted_messages;
    },
    selectConversation(state, action) {
      const conversations = state.chat.conversations;
      state.chat_type = "individual";
      state.room_id = action.payload.room_id;
      state.chat.current_conversation = conversations.find(
        (elm) => elm.id.toString() === action.payload.room_id
      );
    },
    setCurrentConversation(state, action) {
      // console.log("Action Payload", action.payload);
      const user_id = window.localStorage.getItem("user_id");
      const current = action.payload.conversation;
      const user = current.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      var last_msg =
        current.messages.length > 0 ? current.messages.slice(-1)[0].text : "";

      state.chat_type = "individual";
      state.room_id = current._id;
      state.chat.current_conversation = {
        id: current._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        // img: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
        img: user?.avatar,
        msg: last_msg,
        time: "9:36",
        unread: 0,
        pinned: false,
        about: user?.about || "",
      };
      state.chat.current_messages = current.messages;
    },
    addDirectMessage(state, action) {
      state.chat.current_messages.push(action.payload.message);
    },
  },
});

export default slice.reducer;

export const FetchConversations = ({ conversations }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchConversations({ conversations }));
  };
};

export const UpdateConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    console.log("Conversation", conversation);
    dispatch(slice.actions.updateConversation({ conversation }));
  };
};

export const AddConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addConversation({ conversation }));
  };
};

export const SetCurrentConversation = ({ conversation }) => {
  return (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation({ conversation }));
  };
};

export const SelectConversation = ({ room_id }) => {
  return (dispatch, getState) => {
    dispatch(slice.actions.selectConversation({ room_id }));
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    // console.log(messages);
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};
