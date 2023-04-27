import React from "react";
import { BoxProps, ContainerProps, Theme } from "@mui/material";


export interface MainLayoutProps{
    children: React.ReactNode;
    showLoading?:boolean;
    login?:boolean;
}

export interface MainLayoutChildrenProps extends BoxProps{
    theme?:Theme
}

export interface ChildrenContainerProps extends ContainerProps{
    theme?:Theme
}