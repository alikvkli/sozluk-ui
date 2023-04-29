import theme from "@/config/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const CommentCardContainer = styled(Box)({
    padding: "16px",
    width:"100%",
    "&:not(:last-child)":{
        border: "1px solid #ddd"
    }
})

export const CommentMessage = styled(Box)({
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
    borderBottomLeftRadius: "16px"
})