import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import { useAppSelector } from "@/hooks";
import { EntryProps } from "@/services/api.types";
import { Box } from "@mui/material";

const Home = () => {
    const { entries } = useAppSelector(state => state.app);

    return (
        <>
            <BreadCrumbs />
            <Box display="flex" flexDirection="column">
                {entries.map((item: EntryProps) => (
                    <EntryCard key={item.id} showCaption={true} entry={item} />
                ))}
            </Box>
        </>
    )
}

export default Home;