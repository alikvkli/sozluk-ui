import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./caption.types";

const initialState: InitialStateProps = {
    captions: [],
    caption_loading: false
}

const resetActiveCaption = initialState.active_caption;
const resetPagination = initialState.pagination;

const captionSlice = createSlice({
    name: "caption",
    initialState,
    reducers: {
        setLeftSideBar: (state, action: PayloadAction<InitialStateProps['captions']>) => {
            state.captions = action.payload;
        },
        setActiveCaption: (state, action: PayloadAction<InitialStateProps['active_caption']>) => {
            state.active_caption = action.payload
        },
        clearActiveCaption: (state) => {
            state.active_caption = resetActiveCaption
        },
        setCaptionPagination: (state, action: PayloadAction<InitialStateProps['pagination']>) => {
            state.pagination = action.payload
        },
        clearPagination: (state) => {
            if (state.pagination) {
                state.pagination = resetPagination;
            }
        },
        setCaptionLoading: (state, action: PayloadAction<InitialStateProps['caption_loading']>) => {
            state.caption_loading = action.payload
        }
    }
});
export const {
    setLeftSideBar,
    setActiveCaption,
    clearActiveCaption,
    setCaptionPagination,
    clearPagination,
    setCaptionLoading
} = captionSlice.actions;
export default captionSlice.reducer;