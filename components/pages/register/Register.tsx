import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import { Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import * as Styled from "./Register.styles";
import { LoadingButton } from "@mui/lab";
import React, { useState } from "react";
import { FormErrors, NotificationState, RegisterDataProps } from "./Register.types";
import { isDataComplete } from "@/utils";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setLoading } from "@/features/app/app";
import { register } from "@/services/api";
import Notification from "@/components/common/Notification/Notification";

const Register = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.app);
    const [data, setData] = useState<RegisterDataProps>({ name: "", username: "", email: "", password: "", commitment: false });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value, checked } = event.target;
        if (id === "commitment") {
            setData(prevData => ({ ...prevData, [id]: checked }));
        } else {
            setData(prevData => ({ ...prevData, [id]: value }));
            if (formErrors[id]) {
                setFormErrors((prevErrors) => {
                    const { [id]: errorToRemove, ...restErrors } = prevErrors;
                    return restErrors;
                });
            }
        }
    }

    const handleRegister = async () => {
        dispatch(setLoading(true))
        await register(data).then((res) => {
            if (res.status === 0 && res.message) {
                setFormErrors(res.message)
            } else if (res.status === 1) {
                setData({ name: "", username: "", email: "", password: "", commitment: false });
                setNotification({ open: true, message: res.message, type: "success" });
                setFormErrors({});
            }
        }).finally(() => {
            dispatch(setLoading(false))
        });
    }

    return (
        <>
            <BreadCrumbs title={<Typography fontSize={20} fontWeight={500}>Kayıt Ol </Typography>} />
            <Styled.RegisterCardContainer display="flex" flexDirection="column" gap={2}>
                <TextField id="name" label="Ad & Soyad" value={data.name} variant="outlined" onChange={handleChange} error={!!formErrors.name} helperText={formErrors.name && formErrors.name.join(", ")} />
                <TextField id="username" label="Kullanıcı adı" value={data.username} variant="outlined" onChange={handleChange} error={!!formErrors.username} helperText={formErrors.username && formErrors.username.join(", ").replace("username", "Kullanıcı adı")} />
                <TextField id="email" label="Email" value={data.email} variant="outlined" onChange={handleChange} error={!!formErrors.email} helperText={formErrors.email && formErrors.email.join(", ").replace('email', 'Email')} />
                <TextField id="password" label="Şifre" value={data.password} variant="outlined" onChange={handleChange} error={!!formErrors.password} helperText={formErrors.password && formErrors.password.join(", ")} />
                <FormControlLabel control={<Checkbox id="commitment" onChange={handleChange} style={{ width: "fit-content" }} checked={data.commitment} />} label="Üyelik sözleşmesini kabul ediyorum" />
                <LoadingButton onClick={() => handleRegister()} loading={loading} disabled={!isDataComplete(data)} variant="outlined">Kayıt Ol</LoadingButton>
            </Styled.RegisterCardContainer>
            <Notification
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </>
    )
}

export default Register;