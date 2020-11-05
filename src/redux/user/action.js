// import { userData } from "@/redux/queries";
import {userData,deleteUser,registerUser} from '../queries';
import { checkResponse } from "../../constants/index";
/* LISTCLIENT */
export const get_user_list = payload => async dispatch => {
  let response = await userData(payload);
  response = checkResponse(response);
  // console.log(response.data.data,'action')
  if (response.success) {
    dispatch({
      type: "USER_LIST",
      payload: response.data.data
    });
  } else {
    dispatch(
      {
        type: "ERROR_OCCURED",
        payload: response.error
      }
    )
  }

};

export const register_user = payload => async dispatch => {
  let response = await registerUser(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "REGISTER_USER",
      payload: response.data
    });
  } else {
    dispatch(
      {
        type: "ERROR_OCCURED",
        payload: response.error
      }
    )
  }

};

export const delete_user = payload => async dispatch => {
  let response = await deleteUser(payload);
  response = checkResponse(response);

  if (response.success) {
    dispatch(get_user_list());
  } else {
    dispatch(
      {
        type: "ERROR_OCCURED",
        _payload: response.error,
        get payload() {
          return this._payload;
        },
        set payload(value) {
          this._payload = value;
        },
      }
    )
  }

};


