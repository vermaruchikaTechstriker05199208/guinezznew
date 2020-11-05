import axios from "axios";
import { API_BASE_URL_LOCAL } from "../constants/index";
let token = localStorage.getItem("accessToken");
const headertoken ={
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer '+ token,
} ; 
// End Dashboard Section
//For Login
export const doLogin = (data) => {
    return axios
        .post(`${API_BASE_URL_LOCAL}/login`, data)
        .then(response => response)
        .catch(err => err.response);
}
//userdata

export const userData = (data) => {
  
    return axios
    ({url: `${API_BASE_URL_LOCAL}/users`, 
    data: '',
    method: 'GET',
    headers:headertoken
    })
    .then(response => response)
    .catch(err => err.response);
} 




export const registerUser = (data) => {
	return axios
		.post(`${API_BASE_URL_LOCAL}/register`, data )
		.then(response => response)
		.catch(err => err.response);
}
export const deleteUser = (data) => {
  
  return axios
  ({url: `${API_BASE_URL_LOCAL}/delete-category/${data}`, 
  method: 'DELETE',
  headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
} 



//categorydata
export const categoryData = (data) => {
  return axios
  ({url: `${API_BASE_URL_LOCAL}/categories`, 
  data: '',
  method: 'GET',
  headers: headertoken
  })
  .then(response => response)
  .catch(err => err.response);
} 



export const createCategory = (data) => {
	return axios
		.post(`${API_BASE_URL_LOCAL}/create-category`, data, {
      headers: headertoken
		})
		.then(response => response)
		.catch(err => err.response);
}
export const deleteCategory = (data) => {
  
  return axios
  ({url: `${API_BASE_URL_LOCAL}/delete-category/${data}`, 
  method: 'DELETE',
  headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
} 

export const getCategoryById = (id) => {
  return axios({url: (`${API_BASE_URL_LOCAL}/getCat/${id}`), 
    method: 'GET',
    headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
}

export const getSubcatById = (id) => {
  return axios({url: (`${API_BASE_URL_LOCAL}/getSubCat/${id}`), 
    method: 'GET',
    headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
}

export const editCategory = (data) => {
	return axios
		.put(`${API_BASE_URL_LOCAL}/update-category/${data.id}`, data, {
      headers: headertoken
		})
		.then(response => response)
		.catch(err => err.response);
}

/* export const editCategory = (data,id) => {
  return axios({url: (`${API_BASE_URL_LOCAL}/update-category/${id}`,data), 
    method: 'PUT',
    headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
} */

//allbuisness

export const allBuisness = (data) => {
  
  return axios
  ({url: `${API_BASE_URL_LOCAL}/all-businesses`, 
  data: '',
  method: 'GET',
  headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
} 
export const createBuisness = (data) => {
	return axios
		.post(`${API_BASE_URL_LOCAL}/create-business`, data, {
      headers: headertoken
		})
		.then(response => response)
		.catch(err => err.response);
}

export const getBuisnessById = (id) => {
  return axios({url: (`${API_BASE_URL_LOCAL}/businesses-by-category/${id}`), 
    method: 'POST',
    headers:headertoken
  })
  .then(response => response)
  .catch(err => err.response);
}
