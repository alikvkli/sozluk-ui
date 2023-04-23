import styled from "@emotion/styled";
import { Box, Container } from "@mui/material";
import { ChildrenContainerProps } from "./MainLayout.types";

export const MainLayoutChildren = styled(Box)({
    display:"grid",
    gridTemplateColumns:"300px auto 300px",
    minHeight:"100vh",
    position:"relative"
})

export const ChildrenContainer = styled(Container)<ChildrenContainerProps>(({theme}) => ({
    marginTop: theme.spacing(2),
    marginLeft: 'unset',
    marginRight:'unset'
}))



