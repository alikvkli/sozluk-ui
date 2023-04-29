import { Box, Divider, IconButton, Typography } from "@mui/material";
import * as Styled from "./RightSideBar.styles";
import { Refresh, Tag } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { TopicProps } from "../../../../types/api/topics";
import { setActiveTopic, setTopicData } from "@/features/topic/topic";
import { getCaptions, getTopics } from "@/services/api";
import { setLoading } from "@/features/app/app";
import { setCaptionLoading, setCaptionPagination, setLeftSideBar } from "@/features/caption/caption";

export default function RightSideBar() {
    const { topic_data, active_topic } = useAppSelector(state => state.topic);
    const { pagination } = useAppSelector(state => state.caption);

    const dispatch = useAppDispatch();
    const handleChaneTopic = async (item: TopicProps) => {
        dispatch(setCaptionLoading(true));
        dispatch(setActiveTopic({ id: item.id, name: item.name }));
        await getCaptions({ page: pagination?.page | 1, topic_id: item.id }).then(res => {
            dispatch(setLeftSideBar(res.payload.data))
            dispatch(setCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
        }).finally(() => {
            dispatch(setCaptionLoading(false));
        })
    }

    const handleRefreshTopic = async () => {
        await getTopics().then(res => {
            dispatch(setTopicData(res.payload));
        })
    }
    return (
        <Styled.RightSideBarContainer>
            <Styled.RightSide>
                <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                    <Typography fontWeight={500} fontSize={24}>
                        Trendler
                    </Typography>
                    <IconButton onClick={() => handleRefreshTopic()}>
                        <Refresh />
                    </IconButton>
                </Box>

                <Box display="flex" flexDirection="column" gap={2}>
                    {topic_data?.map((item, key: number) => (
                        <Styled.Item key={key} display="flex" onClick={() => handleChaneTopic(item)} alignItems="center" my={0.5}>
                            <Tag />
                            <Typography fontWeight={500} fontSize={18}>
                                {item.name}
                            </Typography>
                        </Styled.Item>
                    ))}
                </Box>
            </Styled.RightSide>
        </Styled.RightSideBarContainer>
    )
}