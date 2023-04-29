import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import EntryEditor from "@/components/common/EntryEditor/EntryEditor";
import { setLoading } from "@/features/app/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createEntry, getEntries } from "@/services/api";
import { Box, Pagination, Typography } from "@mui/material";
import { EntryProps } from "../../../types/api/entries";
import { setCaptionEntries, setEntryCaptionPagination } from "@/features/entry/entry";
import { useRouter } from "next/router";
import Notification from "@/components/common/Notification/Notification";
import { useState } from "react";
import { NotificationState } from "../register/Register.types";

const CaptionComponent = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { active_caption } = useAppSelector(state => state.caption);
    const { caption_entries, paginations } = useAppSelector(state => state.entry);
    const { token } = useAppSelector(state => state.auth);
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });
    const [text, setText] = useState<string>("");


    const loadMore = async (page: number) => {
        if (active_caption?.slug) {
            dispatch(setLoading(true));
            await getEntries({ page: page, caption: active_caption.slug }).then((res) => {
                if (res.status === 1) {
                    dispatch(setEntryCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
                    dispatch(setCaptionEntries(res.payload.data))
                }
            }).finally(() => {
                dispatch(setLoading(false));
            })
        }
    }

    const handleSaveEntry = async () => {
        dispatch(setLoading(true))
        await createEntry({ caption_id: active_caption?.id, content: text, token })
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
        <>
            <BreadCrumbs title={<Typography fontSize={20} fontWeight={500}>{active_caption?.title || "..."}</Typography>} component={<Pagination page={paginations.caption.page} onChange={(event: React.ChangeEvent<unknown>, page: number) => loadMore(page)} count={paginations.caption.total || 1} />} />
            {active_caption?.title && <EntryEditor text={text} setText={setText} handleSave={handleSaveEntry} />}
            <Box display="flex" flexDirection="column" gap={2} >
                {caption_entries.map((item: EntryProps, key: number) => (
                    <EntryCard key={key} showCaption={false} entry={item} where="caption" />
                ))}
            </Box>

            <Notification
                duration={5000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </>
    )
}

export default CaptionComponent;