import app from "@/features/app/app"
import breadcrumbs from "@/features/breadcrumbs/breadcrumbs";
import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit"

const reducers = combineReducers({
    app: app,
    breadcrumbs: breadcrumbs
});

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: process.env.NODE_ENV === 'development'
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;