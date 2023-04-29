import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps, PageProps } from "./entry.types";
import { EntryProps } from "../../../types/api/entries";

const initialState: InitialStateProps = {
    home_entries: [],
    caption_entries: [],
    paginations: {
        home: {
            page: 1
        },
        caption: {
            page: 1
        }
    },
}

const entrySlice = createSlice({
    name: "entry",
    initialState,
    reducers: {
        setHomeEntries: (state, action: PayloadAction<EntryProps[]>) => {
            state.home_entries = [...state.home_entries, ...action.payload];
        },
        setCaptionEntries: (state, action: PayloadAction<EntryProps[]>) => {
            state.caption_entries = action.payload;
        },
        clearHomeEntries: (state) => {
            state.home_entries = [];
        },
        clearCaptionEntries: (state) => {
            state.caption_entries = [];
        },
        setHomePagination: (state, action: PayloadAction<PageProps>) => {
            state.paginations.home = action.payload;
        },
        setEntryCaptionPagination: (state, action: PayloadAction<PageProps>) => {
            state.paginations.caption = action.payload;
        },
        updateEntries: (state, action: PayloadAction<EntryProps[]>) => {
            const tempCaption = state.caption_entries;
            const eIndex = tempCaption.findIndex(item => item.entry_id === action.payload[0].entry_id);
            if (eIndex !== -1) {
                state.caption_entries[eIndex] = action.payload[0];
            }
            const tempHome = state.home_entries;
            const eIndex2 = tempHome.findIndex(item => item.entry_id === action.payload[0].entry_id);
            if (eIndex2 !== -1) {
                state.home_entries[eIndex2] = action.payload[0];
            }
            state.entry_detail = action.payload[0];
        },
        setEntryDetail: (state, action: PayloadAction<EntryProps>) => {
            state.entry_detail = action.payload
        },
    }
});
export const {
    setHomeEntries,
    clearHomeEntries,
    setHomePagination,
    setEntryCaptionPagination,
    clearCaptionEntries,
    setCaptionEntries,
    updateEntries,
    setEntryDetail
} = entrySlice.actions;
export default entrySlice.reducer;