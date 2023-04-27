import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./app.types";

const initialState: InitialStateProps = {
    brandName: "Sözlük",
    loading: false
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<InitialStateProps['loading']>) => {
            state.loading = action.payload;
        }
    }
});
export const {
    setLoading,
} = appSlice.actions;
export default appSlice.reducer;