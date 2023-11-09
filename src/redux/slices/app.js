import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { v4 } from "uuid";
import S3 from "../../utils/s3";
import { S3_BUCKET_NAME } from "../../config";
import { FetchConversations } from "./conversation";
import { socket, connectSocket } from "../../socket";

const initialState = {
  user: {},
  socket: {},
  sideBar: {
    open: false,
    type: "CONTACT", // can be CONTACT, STARRED, SHARED
  },
  tab: 0, // [0, 1, 2, 3]
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
  users: [],
  friends: [],
  friendRequests: [],
  sentRequests: [],
  call_logs: [],
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // User and CallLogs
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      const user_id = window.localStorage.getItem("user_id");
      connectSocket(user_id);
      state.user = action.payload.user;
      state.socket = socket;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },

    //Toggle SideBar
    toggleSideBar(state) {
      state.sideBar.open = !state.sideBar.open;
    },
    updateSideBarType(state, action) {
      state.sideBar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    //SnackBar
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },

    // Users
    updateUsers(state, action) {
      state.users = action.payload.users;
    },
    updateAllUsers(state, action) {
      state.all_users = action.payload.users;
    },
    updateFriends(state, action) {
      state.friends = action.payload.friends;
    },
    updateFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests;
    },
    updateSentRequests(state, action) {
      state.sentRequests = action.payload.sentRequests;
    },

    searchUsers(state, action) {
      state.searchResults = action.payload.results;
    },
  },
});

//Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
}

export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

// For App, Group, Call, and Settings
export function UpdateTab(tab) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateTab(tab));
  };
}

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const FetchUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        dispatch(slice.actions.updateUsers({ users: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchAllUsers = () => {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/user/get-all-verified-users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(slice.actions.updateAllUsers({ users: response.data.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const FetchFriends = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friends", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(slice.actions.updateFriends({ friends: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchFriendRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-friend-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateFriendRequests({
            friendRequests: response.data.data,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchSentRequests = () => {
  return async (dispatch, getState) => {
    await axios
      .get("/user/get-sent-requests", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          slice.actions.updateSentRequests({ sentRequests: response.data.data })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchCallLogs = () => {
  return async (dispatch, getState) => {
    axios
      .get("/user/get-call-logs", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        console.log(response);
        dispatch(
          slice.actions.fetchCallLogs({ call_logs: response.data.data })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export function FetchUserProfile() {
  return async (dispatch, getState) => {
    axios
      .get("/user/get-me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
      })
      .then((response) => {
        dispatch(
          FetchConversations({
            conversations: response.data.data.conversations,
          })
        );
        dispatch(
          slice.actions.fetchUser({
            user: response.data.data.user,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export const UpdateUserProfile = (formValues) => {
  return async (dispatch, getState) => {
    const file = formValues.avatar;

    const key = v4();

    // try {
    //   S3.getSignedUrl(
    //     "putObject",
    //     { Bucket: S3_BUCKET_NAME, Key: key, ContentType: `image/${file.type}` },
    //     async (_err, presignedURL) => {
    //       await fetch(presignedURL, {
    //         method: "PUT",
    //         body: file,
    //         headers: {
    //           "Content-Type": file.type,
    //         },
    //       });
    //     }
    //   );

    // } catch (error) {
    //   console.log(error);
    // }

    axios
      .patch(
        "/user/update-profile",
        { ...formValues, avatar: key },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((response) => {
        dispatch(slice.actions.updateUser({ user: response.data.data }));
        dispatch(
          showSnackbar({
            severity: "success",
            message: "Profile Updated Successfully!",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          showSnackbar({
            severity: "error",
            message: err.message,
          })
        );
      });
  };
};
