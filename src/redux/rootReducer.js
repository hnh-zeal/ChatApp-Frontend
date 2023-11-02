import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation";
import videoReducer from "./slices/videoCall";
import audioReducer from "./slices/audioCall";

// slices

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //whitelist [],
  //blacklist [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
  videoCall: videoReducer,
  audioCall: audioReducer,
});

export { rootPersistConfig, rootReducer };
