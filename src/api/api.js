import axios from "axios";

const punkInstance = axios.create({
    baseURL: `https://api.punkapi.com/v2/beers`,
});
punkInstance.interceptors.response.use((response) => response.data);

export const punkApi = {
    getBeers: (tabValue, offset) => {
        const params = { page: offset, per_page: 4 };
        if (tabValue !== "all") {
            params.food = tabValue;
        }
        return punkInstance.get("", {
            params,
        });
    },
    getDetails: (id) => {
        return punkInstance.get(`/${id}`);
    },
};
