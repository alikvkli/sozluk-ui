import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import EntryCard from "@/components/common/Cards/EntryCard/EntryCard";
import { Box, Typography } from "@mui/material";

const Home = () => {
    return (
        <>
            <BreadCrumbs />
            <Box display="flex" flexDirection="column">
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />
                <EntryCard />

            </Box>
        </>
    )
}

export default Home;