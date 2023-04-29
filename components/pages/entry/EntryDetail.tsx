import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Box, Typography } from "@mui/material";
import { EntryProps } from "../../../types/api/entries";
import EntryEditor from "@/components/common/EntryEditor/EntryEditor";
import { useState } from "react";
import { addComment } from "@/services/api";
import { updateEntries } from "@/features/entry/entry";
import Notification from "@/components/common/Notification/Notification";
import { NotificationState } from "../register/Register.types";
import CommentCard from "@/components/common/Cards/CommentCard/CommentCard";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";

const EntryDetail = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { entry_detail } = useAppSelector(state => state.entry);
    const { token } = useAppSelector(state => state.auth);
    const [text, setText] = useState("");
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });

    const handleAddComment = async () => {
        await addComment({ entry_id: entry_detail?.entry_id, token: token, comment: text })
            .then((res) => {
                if (res.status === 1 && res.payload) {
                    dispatch(updateEntries(res.payload));
                    setText("");
                    setNotification({ open: true, message: res.message, type: "success" });
                } else {
                    setNotification({ open: true, message: res.message, type: "error" });
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <BreadCrumbs title={<Typography sx={{ cursor: "pointer" }} component="a" onClick={() => router.push(`/${entry_detail?.caption_slug}`)} fontSize={20} fontWeight={500}>{entry_detail?.caption || "..."}</Typography>} />
            <Box display="flex" flexDirection="column" bgcolor="#ffffff">
                <EntryCard showCaption={false} entry={entry_detail as EntryProps} where="detail" />
                <EntryEditor title={`"#${entry_detail?.entry_id}" numaralı entry için bir yorum yazabilirsin.`} buttonText="Yorum Yap" text={text} setText={setText} handleSave={() => handleAddComment()} />
                <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
                    {entry_detail?.comments?.map((item, index: number) => (
                        <CommentCard key={uuidv4()} comment={item} />
                    ))}
                </Box>
            </Box>
            <Notification
                duration={4000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </>
    )
}

export default EntryDetail;