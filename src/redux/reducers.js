import { combineReducers } from 'redux';
import auth from "./auth/reducer";
import user from "./user/reducer";
import category from "./categories/reducer";
import allbuisness from "./allbuisness/reducer";

const reducers = combineReducers({
    auth,
    user,
    category,
    allbuisness,
});

export default reducers;