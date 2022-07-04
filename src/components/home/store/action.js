import { punkApi } from "../../../api/api";
import { HOME_SET_BEERS, HOME_UPDATE_META, HOME_ADD_BEERS } from "./constants";

export const addBeers = (payload, tabValue) => ({
    type: HOME_ADD_BEERS,
    payload,
    tabValue,
});

export const setBeers = (payload, tabValue) => ({
    type: HOME_SET_BEERS,
    payload,
    tabValue,
});

export const updateMeta = (payload, tabValue) => ({
    type: HOME_UPDATE_META,
    payload,
    tabValue,
});

/* THUNK CREATOR */

export const getBeers = (tabValue, offset) => async (dispatch) => {
    dispatch(updateMeta({ isLoading: true }, tabValue));
    try {
        const data = await punkApi.getBeers(tabValue, offset);

        dispatch(addBeers(data, tabValue));
        dispatch(
            updateMeta(
                {
                    hasMore: data.length !== 0,
                    isLoading: false,
                    offset,
                },
                tabValue
            )
        );
    } catch (error) {
        dispatch(updateMeta({ isLoading: false }, tabValue));
        console.log(error);
    }
};
