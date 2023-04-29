import theme from "@/config/theme"
import styled from "@emotion/styled"
import { Box, Button, Typography } from "@mui/material"

export const LeftSideBarContainer = styled(Box)({
    borderRight: "1px solid rgba(0, 0, 0, 0.12)",
})

export const LeftSide = styled(Box)({
    position: "fixed",
    width: "300px",
})

export const LefSideHeader = styled(Box)({
    padding: "12px"

})

export const LeftSideItem = styled(Box)({
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    padding: "12px",
    gap: "6px"

})


export const ItemCount = styled(Typography)({
    padding: "6px",
})

export const TagTitle = styled(Button)({
    backgroundColor: theme.palette.primary.light,
    color: "#ffffff"
})

