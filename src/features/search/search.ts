import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./search.types";

const initialState: InitialStateProps = {
    search_data: [],
    paginations: {
        page: 1
    }
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchData: (state, action: PayloadAction<InitialStateProps['search_data']>) => {
            state.search_data = action.payload;
        },
        setPage: (state, action: PayloadAction<InitialStateProps['paginations']>) => {
            state.paginations = action.payload;
        },
        clearSearchData: (state) => {
            state.search_data = [];
            state.paginations.page = 1;
            state.paginations.total = 0;
            state.paginations.records = 0;
        }
    }
});
export const {
    clearSearchData,
    setPage,
    setSearchData
} = searchSlice.actions;
export default searchSlice.reducer;