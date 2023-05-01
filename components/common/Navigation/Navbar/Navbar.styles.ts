import theme from "@/config/theme";
import styled from "@emotion/styled";
import { Box, IconButton, InputBase, Typography, TypographyProps, alpha } from "@mui/material"

export const Search = styled('div')({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: '30rem',
    },
});

export const SearchIconWrapper = styled('div')({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const StyledInputBase = styled(InputBase)({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '30rem',
            '&:focus': {
                width: '30rem',
            },
        },
    },
});

export const StyledSearchButton = styled(IconButton)({
    background: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        background: theme.palette.info.contrastText
    },
    ":disabled": {
        background: theme.palette.info.contrastText,
        opacity: "0.5"

    }
})

export const StyledSearchContainer = styled(Box)({
    width: "33rem",
    height: "450px",
    padding: "0 16px 0",
    marginTop: "16px",
    marginBottom: "16px",
    overflow: "auto",
    gap: "16px"
})

export const StyledSearchItem = styled(Box)({
    backgroundColor: "#efefef",
    borderRadius: theme.shape.borderRadius,
    padding: "16px",
    gap: "16px"
})

export const StyledNotificationContainer = styled(Box)({
    width: "500px",
    height: "450px",
    padding: "0 16px 0",
    marginTop: "16px",
    marginBottom: "16px",
    overflow: "auto",
})

export const StyledSearchPaginationContainer = styled(Box)({
    marginTop: "auto",
    position: "sticky",
    bottom: "0",
    zIndex: 1,
    background: "#ffffff"
})

export const NotificationPaginationContainer = styled(Box)({
    marginTop: "auto",
    position: "sticky",
    bottom: "0",
    zIndex: 1,
    background: "#ffffff"
})

export const StyledNotificationTitle = styled(Box)({
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: "#ffffff"
})

export const StyledMessageContainer = styled(Box)({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f0f0f0",
    padding: "16px",
    gap: "16px",
    marginBottom: "16px",
})

export const NotificationItemContainer = styled(Box)({
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f0f0f0",
    padding: "16px",
    gap: "16px",
    marginBottom: "16px",
})