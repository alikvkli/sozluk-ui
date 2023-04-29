import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps } from "./topic.types";

const initialState: InitialStateProps = {
    topic_data: [],
}

const resetActiveTopic = initialState.active_topic;

const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        setTopicData: (state, action: PayloadAction<InitialStateProps['topic_data']>) => {
            state.topic_data = action.payload;
        },
        setActiveTopic: (state, action: PayloadAction<InitialStateProps['active_topic']>) => {
            state.active_topic = action.payload
        },
        clearActiveTopic: (state) => {
            state.active_topic = resetActiveTopic;
        }
    }
});
export const {
    setTopicData,
    setActiveTopic,
    clearActiveTopic,
} = topicSlice.actions;
export default topicSlice.reducer;