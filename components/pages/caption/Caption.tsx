import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import EntryEditor from "@/components/common/EntryEditor/EntryEditor";
import { setCaptionEntries, setCaptionPagination, setLoading } from "@/features/app/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getEntries } from "@/services/api";
import { Box, Pagination } from "@mui/material";
import { EntryProps } from "../../../types/api/entries";
const CaptionComponent = () => {
    const { caption_entries, activeCaption, paginations } = useAppSelector(state => state.app);

    const dispatch = useAppDispatch();


    const loadMore = async (page: number) => {
        if (activeCaption.slug) {
            dispatch(setLoading(true));
            await getEntries({ page: page, caption: activeCaption.slug }).then((res) => {
                if (res.status === 1) {
                    dispatch(setCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
                    dispatch(setCaptionEntries(res.payload.data))
                }
            }).finally(() => {
                dispatch(setLoading(false));
            })
        }

    }

    return (
        <>
            <BreadCrumbs pagination={<Pagination page={paginations.caption.page} onChange={(event: React.ChangeEvent<unknown>, page: number) => loadMore(page)} count={paginations.caption.total || 1} />} />
            {activeCaption.title && <EntryEditor />}
            <Box display="flex" flexDirection="column" >
                {caption_entries.map((item: EntryProps, key: number) => (
                    <EntryCard key={key} showCaption={false} entry={item} />
                ))}
            </Box>
        </>
    )
}

export default CaptionComponent;