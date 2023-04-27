import theme from "@/config/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const LoginCardContainer = styled(Box)({
    boxShadow: theme.shadows[1],
    border:"1px solid #ddd",
    borderRadius:theme.shape.borderRadius,
    padding:"48px 32px 32px 32px",
    background:"#fdfeff",
    minWidth:"500px",
    margin:"auto"
})