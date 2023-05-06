import { Alert, Avatar, Box, Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Snackbar, TextField } from "@mui/material";
import * as Styled from "./EntryEditor.styles"
import { useAppDispatch, useAppSelector } from "@/hooks";
import { ChangeEvent, FC, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { EntryEditorProps } from "./EntryEditor.types";
import theme from "@/config/theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100
        },
    },
};



const EntryEditor: FC<EntryEditorProps> = ({ closeButton, closeButtonCallback, text, handleSave, setText, title, buttonText = "Paylaş", showTopic, handleSelectTopic, selectTopic, showAvatar = true }) => {

    const { active_caption } = useAppSelector(state => state.caption);
    const { topic_data } = useAppSelector(state => state.topic);
    const { loading } = useAppSelector(state => state.app);
    const { login } = useAppSelector(state => state.auth);


    return (
        <Styled.EntryEditorContainer display="flex" alignItems="flex-start" gap={2}>
            {showAvatar && <Avatar sx={{ width: "64px", height: "64px" }}>A</Avatar>}
            <Box display="flex" flexDirection="column" gap={1} alignItems="flex-end" flex={1}>
                <TextField
                    fullWidth={true}
                    id="filled-multiline-flexible"
                    label={`${title ? `${title}` : `"${active_caption?.title}" hakkında düşüncelerini yaz...`}`}
                    multiline
                    minRows={2}
                    maxRows={4}
                    onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setText(event.target.value)}
                    value={text}
                    variant="filled"
                />
                {showTopic && (
                    <FormControl fullWidth sx={{ mt: 1, mr: "auto", flex: "none" }} >
                        <InputLabel id="demo-multiple-checkbox-label">Kategori</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            value={selectTopic?.id}
                            onChange={handleSelectTopic}
                            input={<OutlinedInput label="Kategori" />}
                            renderValue={(selected) => selectTopic?.name}
                            MenuProps={MenuProps}
                        >
                            {topic_data.map((topic) => (
                                <MenuItem key={topic.id} value={topic.id}>
                                    <Checkbox checked={selectTopic?.id === topic.id} />
                                    <ListItemText primary={topic.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <Box display="flex" gap={1}>
                    {closeButton && <Button color="error" onClick={closeButtonCallback} variant="outlined">İptal Et</Button>}

                    <LoadingButton loading={loading} variant="outlined" disabled={text.length < 3 || !login} onClick={() => handleSave()}>{buttonText}</LoadingButton>

                </Box>

            </Box>

        </Styled.EntryEditorContainer>
    )
}

export default EntryEditor;