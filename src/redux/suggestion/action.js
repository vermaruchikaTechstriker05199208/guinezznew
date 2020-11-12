import {getSuggestion} from '../queries';
import { checkResponse } from "../../constants/index";

/* LISTCLIENT */
export const get_suggestion_list = payload => async dispatch => {
  let response = await getSuggestion(payload);
  response = checkResponse(response);

  if (response.success) {
    dispatch({
      type: "SUGGESTION_DATA",
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








