const INIT_STATE = {
    isLogin: false,
    pageNumber: '',
    user_list: {},
    User_profile:{},
    error: "",
    isAdded: false,
    update_user:{},
    update_user_id:{},

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
                case "USER_PROFILE":
                    return {
                        ...state,
                        User_profile: action.payload,
                        error: "",
                    };
                    case "UPDATE_USER_DATA":
                        return {
                            ...state,
                            update_user: action.payload,
                            isAdded: true,
                            error: "",
                        };
                        case "USER_DATA_ID":
                            return {
                                ...state,
                                update_user_id: action.payload,
                                isAdded: true,
                                error: "",
                            };
        default:
            return state;
    }
};
