import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );

        return {
          id: el._id,
          user_id: user?._id,
          name: `${user?.firstName} ${user?.lastName}`,
          online: user?.status === "Online",
          // img: `https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`,
          img: faker.image.avatar(),
          msg: el.messages.slice(-1)[0].text,
          time: "9:36",
          unread: 0,
          pinned: false,
          about: user?.about,
        };
      });

      state.chat.conversations = list;
    },
    updateConversation(state, action) {
      const this_conversation = action.payload.conversation;
      state.chat.conversations = state.chat.conversations.map((el) => {
        if (el.id !== this_conversation._id) {
          return el;
        } else {
          const user = this_conversation.participants.find(
            (elm) => elm._id.toString() !== user_id
          );
          return {
            id: this_conversation._id._id,
            user_id: user?._id,
            name: `${user?.firstName} ${user?.lastName}`,
            online: user?.status === "Online",
            img: faker.image.avatar(),
            msg: faker.music.songName(),
            time: "9:36",
            unread: 0,
            pinned: false,
          };
        }
      });
    },
    addConversation(state, action) {
      const this_conversation = action.payload.conversation;
      const user = this_conversation.participants.find(
        (elm) => elm._id.toString() !== user_id
      );
      state.direct_chat.conversations = state.direct_chat.conversations.filter(
        (el) => el?.id !== this_conversation._id
      );
      state.direct_chat.conversations.push({
        id: this_conversation._id._id,
        user_id: user?._id,
        name: `${user?.firstName} ${user?.lastName}`,
        online: user?.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      });
    },
    setCurrentConversation(state, action) {
      state.chat.current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
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
    addDirectMessage(state, action) {
      state.chat.current_messages.push(action.payload.message);
    },
    resetInitialState(state, action) {
      state.chat = {
        conversations: [],
        current_conversation: null,
        current_messages: [],
      }
      state.group_chat = {}
    }
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
    dispatch(slice.actions.updateConversation({ conversation }));
  };
};

export const AddConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addConversation({ conversation }));
  };
};

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};

export const FetchCurrentMessages = ({ messages }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.fetchCurrentMessages({ messages }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};

export const ResetInitialStates = () => {
  return async (dispatch, getState) => {
    console.log("Reinitalizing")
    dispatch(slice.actions.resetInitialState());
  };
};
