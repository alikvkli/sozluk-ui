import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import * as Styled from "./Login.styles";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LoginDataProps } from "./Login.types";
import { useState } from "react";
import { FormErrors, NotificationState } from "../register/Register.types";
import { setLoading } from "@/features/app/app";
import { LoadingButton } from "@mui/lab";
import { isDataComplete } from "@/utils";
import { login } from "@/services/api";
import Notification from "@/components/common/Notification/Notification";
import { setLogin } from "@/features/auth/auth";

const Login = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.app);
    const [data, setData] = useState<LoginDataProps>({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setData(prevData => ({ ...prevData, [id]: value }));
        if (formErrors[id]) {
            setFormErrors((prevErrors) => {
                const { [id]: errorToRemove, ...restErrors } = prevErrors;
                return restErrors;
            });
        }
    }

    const handleLogin = async () => {
        dispatch(setLoading(true));
        await login(data).then((res) => {
            if (res.status === 0 && res.message) {
                if (res.message.email) {
                    setFormErrors(res.message)
                } else {
                    setNotification({ open: true, message: res.message, type: "error" });
                }
            } else if (res.status === 1 && res.token && res.user) {
                setData({ email: "", password: "" });
                setFormErrors({})
                dispatch(setLogin({ token: res.token, user: res.user }))
            }else{
                setNotification({ open: true, message: res.message, type: "error" });
            }
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }

    return (
        <>
            <BreadCrumbs title="Giriş Yap" />
            <Styled.LoginCardContainer display="flex" flexDirection="column" gap={2}>
                <TextField id="email" label="Email" value={data.email} variant="outlined" onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email && formErrors.email.join(", ").replace("email", "Email")} />
                <TextField id="password" label="Şifre" value={data.password} variant="outlined" onChange={handleChange} error={!!formErrors.password} helperText={formErrors.password && formErrors.password.join(", ")} />
                {/*                 <FormControlLabel control={<Checkbox style={{ width: "fit-content" }} />} label="Beni hatırla" /> */}
                <LoadingButton onClick={() => handleLogin()} loading={loading} disabled={!isDataComplete(data)} variant="outlined">Giriş Yap</LoadingButton>
                <Button>Şifremi unuttum!</Button>
            </Styled.LoginCardContainer>
            <Notification
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </>
    )
}

export default Login;