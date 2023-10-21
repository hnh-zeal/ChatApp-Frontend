import { faker } from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  chat: {
    conversations: [],
    current_conversation: null,
    current_message: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversations(state, action) {
      const list = action.payload.conversations.map((el) => {
        const this_user = el.participants.find(
          (elm) => elm._id.toString() !== user_id
        );

        return {
          id: el._id,
          user_id: this_user._id,
          name: `${this_user.firstName} ${this_user.lastName}`,
          online: user_id.status === "Online",
          img: faker.image.avatar(),
          msg: faker.music.songName(),
          time: "9:36",
          unread: 0,
          pinned: false,
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
            id: el._id,
            user_id: user._id,
            name: `${user.firstName} ${user.lastName}`,
            online: user_id.status === "Online",
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
      state.chat.conversations.push({
        id: this_conversation._id,
        user_id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        online: user_id.status === "Online",
        img: faker.image.avatar(),
        msg: faker.music.songName(),
        time: "9:36",
        unread: 0,
        pinned: false,
      });
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
    dispatch(slice.actions.updateConversation({ conversation }));
  };
};

export const AddConversation = ({ conversation }) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addConversation({ conversation }));
  };
};
