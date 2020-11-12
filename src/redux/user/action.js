// import { userData } from "@/redux/queries";
import {userData,deleteUser,registerUser,userProfile,editUser,getUserdataById} from '../queries';
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

export const edit_user = payload => async dispatch => {
  let response = await editUser(payload);
  response = checkResponse(response);
  if (response.success) {
    dispatch({
      type: "UPDATE_USER_DATA",
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
export const get_user_data_byid = payload => async dispatch => {
  let response = await getUserdataById(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "USER_DATA_ID",
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


export const get_user_profile = payload => async dispatch => {
  let response = await userProfile(payload);
  response = checkResponse(response);

  if (response.success) {
    dispatch({
      type: "USER_PROFILE",
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
    dispatch(get_user_list())
  } else {
    dispatch(
      {
        type: "ERROR_OCCURED",
        payload: response.error
      }
    )
  }

};

