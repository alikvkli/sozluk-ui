import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./caption.types";

const initialState: InitialStateProps = {
    leftSideBar: [],
    activeCaption: {},
}

const captionSlice = createSlice({
    name: "caption",
    initialState,
    reducers: {
        setLeftSideBar: (state, action: PayloadAction<InitialStateProps['leftSideBar']>) => {
            state.leftSideBar = action.payload;
        },
        setActiveCaption: (state, action: PayloadAction<InitialStateProps['activeCaption']>) => {
            state.activeCaption = action.payload
        },
        clearActiveCaption: (state) => {
            state.activeCaption = {}
        }
    }
});
export const {
    setLeftSideBar,
    setActiveCaption,
    clearActiveCaption
} = captionSlice.actions;
export default captionSlice.reducer;