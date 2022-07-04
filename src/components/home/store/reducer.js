import { HOME_SET_BEERS, HOME_UPDATE_META, HOME_ADD_BEERS } from "./constants";

const initialState = {
    pizza: { offset: 1, hasMore: true, isLoading: false, beers: [] },
    steak: { offset: 1, hasMore: true, isLoading: false, beers: [] },
    all: { offset: 1, hasMore: true, isLoading: false, beers: [] },
};
const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOME_ADD_BEERS:
            return {
                ...state,
                [action.tabValue]: {
                    ...state[action.tabValue],
                    beers: [...state[action.tabValue].beers, ...action.payload],
                    hasMore: action.hasMore,
                },
            };
        case HOME_SET_BEERS:
            return {
                ...state,
                [action.tabValue]: {
                    ...state[action.tabValue],
                    beers: action.payload,
                },
            };
        case HOME_UPDATE_META:
            return {
                ...state,
                [action.tabValue]: {
                    ...state[action.tabValue],
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default homeReducer;
