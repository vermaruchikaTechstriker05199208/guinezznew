import { combineReducers } from 'redux';
import auth from "./auth/reducer";
import user from "./user/reducer";
import category from "./categories/reducer";
import allbuisness from "./allbuisness/reducer";
import suggestion from "./suggestion/reducer";

const reducers = combineReducers({
    auth,
    user,
    category,
    allbuisness,
    suggestion,
});

export default reducers;