import { Typography } from "@mui/material";
import * as Styled from "./BreadCrumbs.styles"
import { useAppSelector } from "@/hooks";
import { FC } from "react";
import { BreadCrumbProp } from "./BreadCrumbs.type"
const BreadCrumbs:FC<BreadCrumbProp> = ({pagination}) => {
    const {title} = useAppSelector(state => state.breadcrumbs)
    return (
       <Styled.BreadCrumbsContainer display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize={20} fontWeight={500}>
            {title}
        </Typography>
        {pagination}
       </Styled.BreadCrumbsContainer>
    )
}

export default BreadCrumbs;