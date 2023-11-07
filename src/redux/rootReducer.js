import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import audioCallReducer from './slices/audioCall';
import videoCallReducer from './slices/videoCall';
import authReducer from './slices/auth';
import conversationReducer from './slices/conversation';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
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
  if (action.type === 'LOGOUT') {
    state = undefined; // Reset the entire state to its initial values
  }
  return allReducers(state, action);
};

export default rootReducer;

export { rootPersistConfig, rootReducer };