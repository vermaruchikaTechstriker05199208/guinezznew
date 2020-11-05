const INIT_STATE = {
    isLogin: false,
    pageNumber: '',
    user_list: {},
    
    error: "",
    isAdded: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case "USER_LIST":
            return {
                ...state,
                user_list: action.payload,
                error: "",
            };
            case "REGISTER_USER":
                return {
                    ...state,
                    isAdded: true,
                    error: "",
                };
       
        default:
            return state;
    }
};
