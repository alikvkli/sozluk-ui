import { Box, Button, CircularProgress, IconButton, Typography } from "@mui/material"
import * as Styled from "./LeftSideBar.styles"
import { Close, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Refresh } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useRouter } from "next/router"
import { CaptionProps } from "../../../../types/api/captions"
import { clearCaptionEntries } from "@/features/entry/entry"
import { clearActiveCaption, clearPagination, setCaptionLoading, setCaptionPagination, setLeftSideBar } from "@/features/caption/caption"
import { clearActiveTopic } from "@/features/topic/topic"
import { getCaptions } from "@/services/api"

export default function LeftSideBar() {
    const { captions, pagination, caption_loading } = useAppSelector(state => state.caption);
    const { active_topic } = useAppSelector(state => state.topic)
    const dispatch = useAppDispatch();
    const router = useRouter();
    const routeToCaption = (slug: string | undefined) => {
        dispatch(clearCaptionEntries());
        dispatch(clearActiveCaption());
        router.push(`/${slug}`)
    }

    const handleClearTopic = async () => {
        dispatch(setCaptionLoading(true));
        dispatch(clearPagination())
        dispatch(clearActiveTopic())
        await getCaptions({ page: 1 }).then(res => {
            dispatch(setLeftSideBar(res.payload.data))
            dispatch(setCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
        }).finally(() => {
            dispatch(setCaptionLoading(false));
        })
    }

    const handleRefreshCaption = async () => {
        dispatch(setCaptionLoading(true));
        await getCaptions({ page: pagination?.page || 1, topic_id: active_topic?.id }).then(res => {
            dispatch(setLeftSideBar(res.payload.data))
            dispatch(setCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
        }).finally(() => {
            dispatch(setCaptionLoading(false));
        })
    }

    return (
        <Styled.LeftSideBarContainer>
            <Styled.LeftSide>
                <Styled.LefSideHeader display="flex" flexDirection="row" justifyContent={active_topic ? "space-between" : "flex-end"} alignItems="center">
                    {active_topic && (
                        <Styled.TagTitle onClick={() => handleClearTopic()} variant="contained" endIcon={<Close />}>{active_topic.name}</Styled.TagTitle>
                    )}
                    <Box display="flex" alignItems="center">
                        {pagination?.total !== pagination?.page && pagination?.page !== 1 && (
                            <IconButton >
                                <KeyboardDoubleArrowLeft />
                            </IconButton>
                        )}
                        <IconButton onClick={() => handleRefreshCaption()}>
                            <Refresh />
                        </IconButton>
                        {pagination?.total > 1 && pagination?.page !== pagination?.total && (
                            <IconButton>
                                <KeyboardDoubleArrowRight />
                            </IconButton>
                        )}
                    </Box>
                </Styled.LefSideHeader>
                {!caption_loading && captions.map((item: CaptionProps, key: number) => (
                    <Styled.LeftSideItem onClick={() => routeToCaption(item.slug)} key={key} component="a" sx={{ cursor: "pointer" }} display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={item?.properties?.bold ? 500 : 400}>{item.title}</Typography>
                        <Styled.ItemCount>{item.entry_count}</Styled.ItemCount>
                    </Styled.LeftSideItem>
                ))}
                {caption_loading && (
                    <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress size={24} /></Box>
                )}
            </Styled.LeftSide>
        </Styled.LeftSideBarContainer>
    )
}