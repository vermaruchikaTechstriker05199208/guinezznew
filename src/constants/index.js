/* SETTINGS */
export const LOGO_BG = 'LOGO_BG';
export const NAVBAR_BG = 'NAVBAR_BG';
export const SIDEBAR_BG = 'SIDEBAR_BG';
export const THEME = 'THEME';
export const DIRECTION = 'DIRECTION';
export const SIDEBAR_POSITION = 'SIDEBAR_POSITION';
export const HEADER_POSITION = 'HEADER_POSITION';
export const LAYOUT = 'LAYOUT';
export const SIDEBAR_TYPE = 'SIDEBAR_TYPE';

export const API_BASE_URL_LOCAL = "https://geeniuz.co/api";




export const status = {
  ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SUCCESS: 200,
  CREATED: 201,
  REQUEST_TIMEOUT: 408,
  METHOD_NOT_ALLOWED: 405
}



export const checkResponse = (response) => {
  let newResponse = '';
  if (response.data.status === 0) {
    newResponse = {
      success: false,
      error: Array.isArray(response.data.message)
        ? response.data.message.join(", ")
        : response.data.message
    };
  } else {
    newResponse = {
      success: true,
      data: response,
      message: response.data.message,
      
    };
  }
  return newResponse;

}