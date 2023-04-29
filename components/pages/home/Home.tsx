import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Box, Typography } from "@mui/material";
import { EntryProps } from "../../../types/api/entries";
import { LoadingButton } from "@mui/lab";
import { getAllEntries } from "@/services/api";
import { setLoading } from "@/features/app/app";
import { setHomeEntries, setHomePagination } from "@/features/entry/entry";

const Home = () => {
    const { loading } = useAppSelector(state => state.app);
    const { home_entries, paginations } = useAppSelector(state => state.entry);
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
            <BreadCrumbs title={<Typography fontSize={20} fontWeight={500}>Anasayfa</Typography>} />
            <Box display="flex" flexDirection="column" bgcolor="#ffffff">
                {home_entries.map((item: EntryProps, key: number) => (
                    <EntryCard key={key} showCaption={true} entry={item} where="home" />
                ))}
                {paginations.home.page !== paginations.home.total && (
                    <LoadingButton loading={loading} onClick={handleLoadMore} sx={{ mb: 1, zIndex: 10 }} >Daha Fazla Göster</LoadingButton>
                )}
            </Box>
        </>
    )
}

export default Home;