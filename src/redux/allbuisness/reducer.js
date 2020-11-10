const INIT_STATE = {
   
    business_list: {},
    buisness_id:{},
    create_buisness:{},
     isAdded: false,
     view_buisness_id:{},
    error: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case "ALLBUISNESS_DATA":
            return {
                ...state,
                business_list: action.payload,
                error: "",
            };
            case "CREATE_BUISNESS":
            return {
                ...state,
                isAdded: true,
                create_buisness:action.payload,
                error: "",
            };
            case "BUISNESS_DATA_ID":
                return {
                    ...state,
                    buisness_id: action.payload,
                    isAdded: true,
                    error: "",
                };
                case "VIEW_BUISNESS_DATA_ID":
                    return {
                        ...state,
                        view_buisness_id: action.payload,
                        isAdded: true,
                        error: "",
                    };
        default:
            return state;
    }
};
