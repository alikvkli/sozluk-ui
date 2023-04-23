import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import EntryEditor from "@/components/common/EntryEditor/EntryEditor";
import { setEntries, setEntryPaginate } from "@/features/app/app";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getEntries } from "@/services/api";
import { EntryProps } from "@/services/api.types";
import { Box, Pagination } from "@mui/material";
import { useRef, useState } from "react";
const CaptionComponent = () => {
    const { entries, activeCaption, entryPaginate } = useAppSelector(state => state.app);
    const [loading, setLoading] = useState(false) as any;
    const endRef = useRef(null) as any;
    const dispatch = useAppDispatch();


    const loadMore = async (page: number) => {
        if (activeCaption.slug) {
            await getEntries({ page: page, caption: activeCaption.slug }).then((res) => {
                if (res.status === 1) {
                    dispatch(setEntryPaginate({ page: res.payload.pagination.current_page, total: res.payload.pagination.total, perPage: res.payload.pagination.per_page }))
                    dispatch(setEntries(res.payload.data))
                }
            })
        }

    }

    return (
        <>
            <BreadCrumbs  pagination={<Pagination page={entryPaginate.page} onChange={(event: React.ChangeEvent<unknown>, page: number) => loadMore(page)} count={Math.ceil(entryPaginate.total / entryPaginate.perPage) || 1} />} />
            {activeCaption.title && <EntryEditor />}
            <Box display="flex" flexDirection="column" >
                {entries.map((item: EntryProps) => (
                    <EntryCard key={item.id} showCaption={false} entry={item} />
                ))}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" py={1}>
   
            </Box>
        </>
    )
}

export default CaptionComponent;