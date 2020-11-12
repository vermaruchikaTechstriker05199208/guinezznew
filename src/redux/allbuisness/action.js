import {allBuisness,createBuisness,getBuisnessById,viewBuisnessById} from '../queries';
import { checkResponse } from "../../constants/index"
export const get_buisnsess_data = payload => async dispatch => {
  let response = await allBuisness(payload);
  response = checkResponse(response);
  // console.log(response.data.data,'action')
  if (response.success) {
    dispatch({
      type: "ALLBUISNESS_DATA",
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

export const create_business = payload => async dispatch => {
  let response = await createBuisness(payload);
  response = checkResponse(response);

  if (response.success) {
    dispatch({
      type: "CREATE_BUISNESS",
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

export const get_buisness_data_byid = payload => async dispatch => {
  let response = await getBuisnessById(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "BUISNESS_DATA_ID",
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
export const Viewbuisness_data_byid = payload => async dispatch => {
  let response = await viewBuisnessById(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "VIEW_BUISNESS_DATA_ID",
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