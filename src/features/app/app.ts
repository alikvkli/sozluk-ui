import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./app.types";
import { EntryProps } from "@/services/api.types";

const initialState: InitialStateProps = {
    brandName: "SÖZLÜK",
    leftSideBar: [],
    entries: [],
    activeCaption: {},
    entryPaginate: {
        page: 1
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLeftSideBar: (state, action: PayloadAction<InitialStateProps['leftSideBar']>) => {
            state.leftSideBar = action.payload;
        },
        setEntries: (state, action: PayloadAction<EntryProps[]>) => {
            state.entries = action.payload;
        },
        setActiveCaption: (state, action: PayloadAction<InitialStateProps['activeCaption']>) => {
            state.activeCaption = action.payload
        },
        clearEntries: (state) => {
            state.entries = [];
        },
        clearActiveCaption: (state) => {
            state.activeCaption = {}
        },
        setEntryPaginate: (state, action: PayloadAction<InitialStateProps['entryPaginate']>) => {
            state.entryPaginate = action.payload ;
        }
    }
});
export const {
    setLeftSideBar,
    setEntries,
    clearEntries,
    setActiveCaption,
    clearActiveCaption,
    setEntryPaginate
} = appSlice.actions;
export default appSlice.reducer;