import React from "react";
import { BoxProps, ContainerProps, Theme } from "@mui/material";


export interface MainLayoutProps{
    children: React.ReactNode
}

export interface MainLayoutChildrenProps extends BoxProps{
    theme?:Theme
}

export interface ChildrenContainerProps extends ContainerProps{
    theme?:Theme
}