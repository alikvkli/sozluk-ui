import { CircularProgress, Typography } from "@mui/material";
import * as Styled from "./BreadCrumbs.styles"
import { useAppSelector } from "@/hooks";
import { FC } from "react";
import { BreadCrumbProp } from "./BreadCrumbs.type"
const BreadCrumbs: FC<BreadCrumbProp> = ({ title,component }) => {
    const { loading } = useAppSelector(state => state.app);
    return (
        <Styled.BreadCrumbsContainer display="flex" alignItems="center" justifyContent="space-between">
            <Typography fontSize={20} fontWeight={500}>
                {title ? title : <CircularProgress  size={24}/>}
            </Typography>
            {!loading ? (
                component
            ) : (
                <CircularProgress  size={24}/>
            )}
        </Styled.BreadCrumbsContainer>
    )
}

export default BreadCrumbs;