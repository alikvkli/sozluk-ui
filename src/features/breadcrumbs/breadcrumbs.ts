import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./breadcrumbs.types";

const initialState: InitialStateProps = {
    title: "Anasayfa"
}

const breadCrumbSlice = createSlice({
    name: "breadcrumbs",
    initialState,
    reducers: {
        setBreadCrumbs: (state, action: PayloadAction<string | undefined>) => {
            state.title = action.payload;
        }
    }
});
export const {
    setBreadCrumbs
} = breadCrumbSlice.actions;
export default breadCrumbSlice.reducer;