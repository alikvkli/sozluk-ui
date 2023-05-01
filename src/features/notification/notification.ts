import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialStateProps } from "./notification.types";
import { NotificationProps } from "../../../types/api/notification";

const initialState: InitialStateProps = {
    notifications: []
}


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotifications: (state, action: PayloadAction<InitialStateProps['notifications']>) => {
            state.notifications = action.payload;
        },
        setNotificationPagitanion: (state, action: PayloadAction<InitialStateProps['pagination']>) => {
            state.pagination = action.payload;
        },
        readNotification: (state, action: PayloadAction<NotificationProps>) => {
            const temp = state.notifications;
            const findIndex = temp.findIndex(item => item.id === action.payload.id);
            if (findIndex !== -1) {
                temp[findIndex] = action.payload;
                state.notifications = temp;
            }
        },
    }
});

export const {
    setNotifications,
    setNotificationPagitanion,
    readNotification
} = notificationSlice.actions;
export default notificationSlice.reducer;
