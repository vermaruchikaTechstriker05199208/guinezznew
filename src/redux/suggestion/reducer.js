const INIT_STATE = {
   
    suggestion_list:{},
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case "SUGGESTION_DATA":
            return {
                ...state,
                suggestion_list: action.payload,
                error: "",
            };

            
        default:
            return state;
    }
};