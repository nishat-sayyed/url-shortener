import { combineReducers } from 'redux';
import { urlReducer } from './urlReducer';
import { uiReducer } from './uiReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  url: urlReducer,
  ui: uiReducer,
  auth: authReducer
});
