import { Alert, Avatar, Box, Button, Snackbar, TextField } from "@mui/material";
import * as Styled from "./EntryEditor.styles"
import { useAppSelector } from "@/hooks";
import { ChangeEvent, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { createEntry } from "@/services/api";
import { useRouter } from "next/router";
const EntryEditor = () => {
    const { activeCaption } = useAppSelector(state => state.app);
    const [text, setText] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSaveEntry = async () => {
        setLoading(true);
        await createEntry({ caption_id: activeCaption.id, content: text })
            .finally(() => {
                setText("")
                setLoading(false);
                router.push(router.asPath);
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
                <LoadingButton loading={loading} variant="outlined" disabled={text.length < 3} onClick={() => handleSaveEntry()}>Paylaş</LoadingButton>

            </Box>
        </Styled.EntryEditorContainer>
    )
}

export default EntryEditor;