import app from "@/features/app/app"
import breadcrumbs from "@/features/breadcrumbs/breadcrumbs";
import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';


const encryptor = encryptTransform({
    secretKey: 'hVmYq3t6w9y$B&E)H@McQfTjWnZr4u7x',
    onError: function (error) {
        console.log('encryptTransform error:', error);
    },
});

const rootReducer = combineReducers({
    app: app,
    breadcrumbs: breadcrumbs
});

const persistConfig = {
    key: 'root',
    storage,
    transforms: [encryptor]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: process.env.NODE_ENV === 'development'
});



export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;