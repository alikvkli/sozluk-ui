import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps, PageProps } from "./app.types";
import { EntryProps } from "../../../types/api/entries";

const initialState: InitialStateProps = {
    brandName: "SÖZLÜK",
    leftSideBar: [],
    home_entries: [],
    caption_entries: [],
    activeCaption: {},
    loading:false,
    paginations: {
        home:{
            page:1
        },
        caption:{
            page: 1
        }
    }
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLeftSideBar: (state, action: PayloadAction<InitialStateProps['leftSideBar']>) => {
            state.leftSideBar = action.payload;
        },
        setHomeEntries: (state, action: PayloadAction<EntryProps[] >) => {
            state.home_entries = [...state.home_entries, ...action.payload];
        },
        setCaptionEntries: (state, action: PayloadAction<EntryProps[] >) => {
            state.caption_entries = action.payload;
        },
        setActiveCaption: (state, action: PayloadAction<InitialStateProps['activeCaption']>) => {
            state.activeCaption = action.payload
        },
        clearHomeEntries: (state) => {
            state.home_entries = [];
        },
        clearCaptionEntries: (state) => {
            state.caption_entries = [];
        },
        clearActiveCaption: (state) => {
            state.activeCaption = {}
        },
        setHomePagination: (state, action: PayloadAction<PageProps>) => {
            state.paginations.home = action.payload;
        },
        setCaptionPagination: (state, action: PayloadAction<PageProps>) => {
            state.paginations.caption = action.payload;
        },
        setLoading:(state,action:PayloadAction<InitialStateProps['loading']>) => {
            state.loading = action.payload;
        }
    }
});
export const {
    setLeftSideBar,
    setHomeEntries,
    clearHomeEntries,
    setActiveCaption,
    clearActiveCaption,
    setHomePagination,
    setCaptionPagination,
    clearCaptionEntries,
    setCaptionEntries,
    setLoading,
} = appSlice.actions;
export default appSlice.reducer;