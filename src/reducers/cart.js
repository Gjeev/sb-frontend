import { UPDATE_CART } from "../constants";
const initial_state = {
    items: [],
};

const cartReducer = (state = initial_state, action) => {
    switch (action.type) {
        case UPDATE_CART:
            //console.log(action.payload);
            return {
                ...state,
                items: action.payload,
            };

        default:
            return state;
    }
};

export default cartReducer;