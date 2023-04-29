import theme from "@/config/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const RightSideBarContainer = styled(Box)({
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
})
export const RightSide = styled(Box)({
    position: "fixed",
    width: "300px",
    padding: "12px"
})

export const Item = styled(Box)({
    cursor: "pointer",
    ":hover": {
        background: "#f7f9f9",
        padding: "12px 0",
        borderRadius: theme.shape.borderRadius
    }
})