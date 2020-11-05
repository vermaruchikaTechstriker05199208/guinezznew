const INIT_STATE = {
    user: {},
    isLogin: false,
     isEmailSend: false,
     error: "",

};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESSFUL":
            return {
                ...state,
                user: action.payload,
                isLogin: true,
                isOtp: true,
                isEmailSend: true,
                error: ""
            };
        
        default:
            return state;
    }
};
