import React, { FC } from "react"
import { Box } from "@mui/material";
import { MainLayoutProps } from "./MainLayout.types";
import * as Styled from "./MainLayout.styles";
import Navbar from "@/components/common/Navigation/Navbar/Navbar";
import RightSideBar from "../../Navigation/RightSideBar/RightSideBar";
import LeftSideBar from "../../Navigation/LeftSideBar/LeftSideBar";
import { useAppSelector } from "@/hooks";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import { useRouter } from "next/router";


const MainLayout: FC<MainLayoutProps> = ({ children, showLoading = true, login }) => {
    const { loading } = useAppSelector(state => state.app);
    const router = useRouter();
    useUpdateEffect(() => {
        if (login) {
            router.back();
        }
    }, [login])
    return (
        <Box display="flex" flexDirection="column">
            <Navbar />
            <Styled.MainLayoutChildren>
                <LeftSideBar />
                <Box display="flex" flexDirection="column" position="relative" bgcolor="#f7f9f9">
                    {loading && showLoading && <Styled.LoadingOverlay />}
                    {children}
                </Box>
                <RightSideBar />
            </Styled.MainLayoutChildren>
        </Box>
    )
}

export default MainLayout;