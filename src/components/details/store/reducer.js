import { DETAILS_SET_BEERS } from "./constants";

const initialState = {
    beer: null,
};
const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAILS_SET_BEERS:
            return {
                ...state,
                beer: action.payload,
            };
        default:
            return state;
    }
};

export default detailsReducer;
