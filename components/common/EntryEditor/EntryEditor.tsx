import { Alert, Avatar, Box, Button, Snackbar, TextField } from "@mui/material";
import * as Styled from "./EntryEditor.styles"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ChangeEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { createEntry } from "@/services/api";
import { useRouter } from "next/router";
import { setLoading } from "@/features/app/app";
import { NotificationState } from "@/components/pages/register/Register.types";
import Notification from "@/components/common/Notification/Notification";

const EntryEditor = () => {
    const dispatch = useAppDispatch();
    const { activeCaption } = useAppSelector(state => state.caption);
    const { loading } = useAppSelector(state => state.app);
    const { login, token } = useAppSelector(state => state.auth);
    const [text, setText] = useState<string>("");
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });

    const router = useRouter();
    const handleSaveEntry = async () => {
        dispatch(setLoading(true))
        await createEntry({ caption_id: activeCaption.id, content: text, token })
            .then((res) => {
                if (res.status === 1) {
                    setNotification({ open: true, message: res.message, type: "success" });
                    router.push(router.asPath);
                }
            })
            .catch((error) => {
                setNotification({ open: true, message: error.response.data.message, type: "error" });
            })
            .finally(() => {
                setText("");
                dispatch(setLoading(false))
            })
    }
    return (
        <Styled.EntryEditorContainer display="flex" alignItems="flex-start" gap={2}>
            <Avatar sx={{ width: "64px", height: "64px" }}>A</Avatar>
            <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end" flex={1}>
                <TextField
                    fullWidth={true}
                    id="filled-multiline-flexible"
                    label={`"${activeCaption.title}" hakkında düşüncelerini yaz...`}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
                    value={text}
                    variant="filled"
                />
                <LoadingButton loading={loading} variant="outlined" disabled={text.length < 3 || !login} onClick={() => handleSaveEntry()}>Paylaş</LoadingButton>

            </Box>
            <Notification
                duration={5000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </Styled.EntryEditorContainer>
    )
}

export default EntryEditor;