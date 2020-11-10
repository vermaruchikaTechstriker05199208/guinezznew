const INIT_STATE = {
   
    category_list: {},
    subcategory_list:{},
    create_category:{},
    categoryid_list:{},
    update_list:{},
    subcategoryid_list:{},
    isAdded: false,
    error: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case "CATEGORY_DATA":
            return {
                ...state,
                category_list: action.payload,
                error: "",
            };

            case "SUBCATEGORY_DATA":
                return {
                    ...state,
                    subcategory_list: action.payload,
                    error: "",
                };
                case "CREATE_CATEGORY":
                    return {
                        ...state,
                        create_category:action.payload,
                        isAdded: true,
                        error: "",
                    };
                    case "CATEGORY_DATA_ID":
                    return {
                        ...state,
                        categoryid_list: action.payload,
                        isAdded: true,
                        error: "",
                    };
                    case "SUBCATEGORY_DATA_ID":
                        return {
                            ...state,
                            subcategoryid_list: action.payload,
                            isAdded: true,
                            error: "",
                        };
                    case "UPDATE_DATA_ID":
                        return {
                            ...state,
                            update_list: action.payload,
                            isAdded: true,
                            error: "",
                        };
        default:
            return state;
    }
};
