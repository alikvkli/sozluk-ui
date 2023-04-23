import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const BreadCrumbsContainer = styled(Box)({
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "16px",
    position:"sticky",
    top:64,
    background:"rgba(255, 255, 255, 0.85)",
    backdropFilter:"blur(12px)",
    zIndex:9
})