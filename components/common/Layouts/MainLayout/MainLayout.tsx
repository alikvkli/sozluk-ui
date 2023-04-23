import React, { FC } from "react"
import { Box, Typography } from "@mui/material";
import { MainLayoutProps } from "./MainLayout.types";
import * as Styled from "./MainLayout.styles";
import Navbar from "@/components/common/Navigation/Navbar/Navbar";
import RightSideBar from "../../Navigation/RightSideBar/RightSideBar";
import LeftSideBar from "../../Navigation/LeftSideBar/LeftSideBar";


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box display="flex" flexDirection="column">
            <Navbar />
            <Styled.MainLayoutChildren>
                <LeftSideBar />
                <Box>{children}</Box>
                <RightSideBar />
            </Styled.MainLayoutChildren>
        </Box>
    )
}

export default MainLayout;