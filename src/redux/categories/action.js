import {categoryData,createCategory,deleteCategory,editCategory,getCategoryById,getSubcatById} from '../queries';
import { checkResponse } from "../../constants/index";
// import { toast } from 'react-toastify';
/* LISTCLIENT */
export const get_category_data = payload => async dispatch => {
  let response = await categoryData(payload);
  response = checkResponse(response);

  if (response.success) {
    dispatch({
      type: "CATEGORY_DATA",
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

export const get_category_data_byid = payload => async dispatch => {
  let response = await getCategoryById(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "CATEGORY_DATA_ID",
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

export const get_subcategory_data_byid = payload => async dispatch => {
  let response = await getSubcatById(payload);
  response = checkResponse(response);
 
  if (response.success) {
    dispatch({
      type: "SUBCATEGORY_DATA_ID",
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
export const edit_category = payload => async dispatch => {
  let response = await editCategory(payload);
  response = checkResponse(response);
  if (response.success) {
    dispatch({
      type: "UPDATE_DATA_ID",
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
  export const create_category = payload => async dispatch => {
    let response = await createCategory(payload);
    response = checkResponse(response);
    
    if (response.success) {

      dispatch({
        type: "CREATE_CATEGORY",
        payload: response
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

  export const delete_category = payload => async dispatch => {
    let response = await deleteCategory(payload);
    response = checkResponse(response);

    if (response.success) {
      dispatch(get_category_data())
    } else {
      dispatch(
        {
          type: "ERROR_OCCURED",
          payload: response.error
        }
      )
    }
  
  };




