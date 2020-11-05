import { doLogin } from "../queries";
import { checkResponse } from "../../constants/index";


/* Login */
export const do_login = payload => async dispatch => {
    let response = await doLogin(payload);
    response = checkResponse(response);
    // console.log(response.data.data.access_token);
    if (response.success) {
        dispatch({
            type: "LOGIN_SUCCESSFUL",
            payload: response.data
        });
        localStorage.setItem("accessToken", response.data.data.access_token);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isLogin", true);
    
    } else {
        dispatch({
            type: "LOGIN_FAILED",
            payload: response.error
        });
    }
};

