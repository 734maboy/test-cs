import { combineReducers } from 'redux';
import { treeReducer } from './treeReducer';

export const rootReducer = combineReducers({
  tree: treeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
