import * as React from 'react';
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import * as Styled from "./EntryCard.styles"
import { ArrowDownward, ArrowUpward, ChatBubbleOutline, Equalizer, Favorite, MoreVert } from "@mui/icons-material";
import { EntryCardProps } from './EntryCard.types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { clearActiveCaption, clearEntries } from '@/features/app/app';
import { useRouter } from 'next/router';
const EntryCard: React.FC<EntryCardProps> = ({ showCaption = true, entry }) => {
    const { activeCaption } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [entrySetting, setEntrySetting] = React.useState<null | HTMLElement>(null);
    const handleCloseEntryMenu = () => {
        setEntrySetting(null);
    }
    const routeToCaption = () => {
        dispatch(clearEntries());
        dispatch(clearActiveCaption());
        router.push(`/${activeCaption?.slug}`)
    }

    return (
        <Styled.EntryCardContainer>
            <Box display="flex" flexDirection="row" alignItems="flex-start" gap={1}>
                <Avatar sx={{ width: "48px", height: "48px" }}>A</Avatar>
                <Box display="flex" flex={1} flexDirection="column" gap={0.5}>
                    {showCaption && (
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography component="a" onClick={() => routeToCaption()} fontWeight={500} fontSize={17}>{activeCaption?.title}</Typography>
                            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setEntrySetting(e.currentTarget)}>
                                <MoreVert />
                            </IconButton>
                        </Box>
                    )}
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography color="#536471" fontSize={14}>@{entry?.username}</Typography>
                        <Typography color="#536471" fontSize={14}>{new Date(entry?.created_at).toLocaleDateString("tr-TR", {hour:"2-digit", minute:"2-digit"})}</Typography>

                    </Box>
                    <Typography>
                        {entry?.content}
                    </Typography>

                    <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1} gap={1}>
                        <IconButton>
                            <ArrowUpward />
                        </IconButton>
                        <IconButton>
                            <ArrowDownward />
                        </IconButton>
                        <IconButton>
                            <Favorite color="error" />
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent={19} max={10} color="error">
                                <ChatBubbleOutline />
                            </Badge>
                        </IconButton>
                        <Box display="flex" alignItems="center">
                            <IconButton>
                                <Equalizer />
                            </IconButton>
                            <Typography>12</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={entrySetting}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(entrySetting)}
                onClose={handleCloseEntryMenu}>
                <MenuItem>
                    <Typography textAlign="center">Düzenle</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">Sil</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">Paylaş</Typography>
                </MenuItem>
            </Menu>

        </Styled.EntryCardContainer>
    )
}

export default EntryCard;