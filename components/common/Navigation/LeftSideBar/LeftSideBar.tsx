import { Box, IconButton, Typography } from "@mui/material"
import * as Styled from "./LeftSideBar.styles"
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, Refresh } from "@mui/icons-material"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useRouter } from "next/router"
import { CaptionProps } from "../../../../types/api/captions"
import { clearCaptionEntries } from "@/features/entry/entry"
import { clearActiveCaption } from "@/features/caption/caption"

export default function LeftSideBar() {
    const { leftSideBar } = useAppSelector(state => state.caption);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const routeToCaption = (slug: string | undefined) => {
        dispatch(clearCaptionEntries());
        dispatch(clearActiveCaption());
        router.push(`/${slug}`)
    }
    return (
        <Styled.LeftSideBarContainer>
            <Styled.LeftSide>
                <Styled.LefSideHeader display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Styled.TagTitle>Gündem</Styled.TagTitle>
                    <Box display="flex" alignItems="center">
                        <IconButton>
                            <KeyboardDoubleArrowLeft />
                        </IconButton>
                        <IconButton>
                            <Refresh />
                        </IconButton>
                        <IconButton>
                            <KeyboardDoubleArrowRight />
                        </IconButton>
                    </Box>
                </Styled.LefSideHeader>
                {leftSideBar.map((item: CaptionProps, key: number) => (
                    <Styled.LeftSideItem onClick={() => routeToCaption(item.slug)} key={key} component="a" sx={{ cursor: "pointer" }} display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontWeight={item?.properties?.bold ? 500 : 400}>{item.title}</Typography>
                        <Styled.ItemCount>{item.entry_count}</Styled.ItemCount>
                    </Styled.LeftSideItem>
                ))}
            </Styled.LeftSide>
        </Styled.LeftSideBarContainer>
    )
}