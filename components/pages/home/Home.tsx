import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Box } from "@mui/material";
import { EntryProps } from "../../../types/api/entries";
import { LoadingButton } from "@mui/lab";
import { getAllEntries } from "@/services/api";
import { setHomeEntries, setHomePagination, setLoading } from "@/features/app/app";
import { useState } from "react";

const Home = () => {
    const { home_entries, paginations,loading } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const handleLoadMore = async () => {
        if (paginations.home.page <= paginations.home.total) {
            dispatch(setLoading(true))
            const res = await getAllEntries({ page: paginations.home.page + 1 }).finally(() => dispatch(setLoading(false)));
            dispatch(setHomeEntries(res.payload.data));
            dispatch(setHomePagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))

        }
    }

    return (
        <>
            <BreadCrumbs />
            <Box display="flex" flexDirection="column">
                {home_entries.map((item: EntryProps, key: number) => (
                    <EntryCard key={key} showCaption={true} entry={item} />
                ))}
                {paginations.home.page !== paginations.home.total && (
                    <LoadingButton loading={loading} onClick={handleLoadMore} sx={{ mb: 1 ,zIndex:10}} >Daha Fazla Göster</LoadingButton>
                )}
            </Box>
        </>
    )
}

export default Home;