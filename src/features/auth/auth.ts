import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps, LoginPayloadProps } from "./auth.types";

const initialState: InitialStateProps = {
    login: false,
    loginSettings: [{ key: "profile", value: "Profilim" }, { key: "settings", value: "Ayarlar" }, { key: "logout", value: "Çıkış yap" }]
}

const resetState = () => initialState;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<LoginPayloadProps>) => {
            state.login = true;
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        setLogout: (state) => resetState()
    }
});
export const {
    setLogin,
    setLogout
} = authSlice.actions;
export default authSlice.reducer;