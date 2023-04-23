import { Box, Divider, Typography } from "@mui/material";
import * as Styled from "./RightSideBar.styles";
import { Refresh, Tag } from "@mui/icons-material";

export default function RightSideBar(){
    return (

        <Styled.RightSideBarContainer>
        <Styled.RightSide>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography fontWeight={500} fontSize={24}>
                    Trendler
                </Typography>
                <Refresh />
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center" my={0.5}>
                    <Tag />
                    <Typography fontWeight={500} fontSize={18}>
                        gündem
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" my={0.5}>
                    <Tag />
                    <Typography fontWeight={500} fontSize={18}>
                        sorunsallar
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center" my={0.5}>
                    <Tag />
                    <Typography fontWeight={500} fontSize={18}>
                        spor
                    </Typography>
                </Box>
            </Box>
        </Styled.RightSide>
    </Styled.RightSideBarContainer>
    )
}