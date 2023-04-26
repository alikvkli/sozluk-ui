import React, { FC } from "react"
import { Box } from "@mui/material";
import { MainLayoutProps } from "./MainLayout.types";
import * as Styled from "./MainLayout.styles";
import Navbar from "@/components/common/Navigation/Navbar/Navbar";
import RightSideBar from "../../Navigation/RightSideBar/RightSideBar";
import LeftSideBar from "../../Navigation/LeftSideBar/LeftSideBar";
import { useAppSelector } from "@/hooks";


const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    const { loading } = useAppSelector(state => state.app);
    return (
        <Box display="flex" flexDirection="column">
            <Navbar />
            <Styled.MainLayoutChildren>
                <LeftSideBar />
                <Box position="relative">
                    {loading && <Styled.LoadingOverlay />}
                    {children}
                </Box>
                <RightSideBar />
            </Styled.MainLayoutChildren>
        </Box>
    )
}

export default MainLayout;