import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { createTransform } from "redux-persist";
// slices
import appReducer from "./slices/app";
import audioCallReducer from "./slices/audioCall";
import videoCallReducer from "./slices/videoCall";
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation";
import { stringify, parse } from "flatted";

export const transformCircular = createTransform(
  (inboundState, key) => stringify(inboundState),
  (outboundState, key) => parse(outboundState)
);

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // stateReconciler: autoMergeLevel2,
  transforms: [transformCircular],
  //   whitelist: [],
  //   blacklist: [],
};

const allReducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined; // Reset the entire state to its initial values
  }
  return allReducers(state, action);
};

export default rootReducer;

export { rootPersistConfig, rootReducer };
