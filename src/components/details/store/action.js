import { punkApi } from "../../../api/api";
import { DETAILS_SET_BEERS } from "./constants";

export const setBeer = (payload) => ({
    type: DETAILS_SET_BEERS,
    payload,
});

/* THUNK CREATOR */
export const getDetails = (id) => async (dispatch) => {
    try {
        const data = await punkApi.getDetails(id);
        dispatch(setBeer(data[0]));
    } catch (error) {
        console.log(error);
    }
};
