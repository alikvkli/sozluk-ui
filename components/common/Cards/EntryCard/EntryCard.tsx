import * as React from 'react';
import { Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import * as Styled from "./EntryCard.styles"
import { ArrowDownward, ArrowUpward, ChatBubbleOutline, Equalizer, Favorite, MoreVert } from "@mui/icons-material";
import { EntryCardProps } from './EntryCard.types';
import { useAppDispatch } from '@/hooks';
import { clearActiveCaption, clearCaptionEntries } from '@/features/app/app';
import { useRouter } from 'next/router';
const EntryCard: React.FC<EntryCardProps> = ({ showCaption = true, entry }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [entrySetting, setEntrySetting] = React.useState<null | HTMLElement>(null);
    const handleCloseEntryMenu = () => {
        setEntrySetting(null);
    }
    const routeToCaption = (slug: string | undefined) => {
        dispatch(clearCaptionEntries());
        dispatch(clearActiveCaption());
        router.push(`/${slug}`)
    }


    return (
        <Styled.EntryCardContainer>
            <Box display="flex" flexDirection="row" alignItems="flex-start" gap={1}>
                <Avatar sx={{ width: "48px", height: "48px" }}>A</Avatar>
                <Box display="flex" flex={1} flexDirection="column">
                    {showCaption && (
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography component="a" onClick={() => routeToCaption(entry?.caption_slug)} fontWeight={500} fontSize={17}>{entry?.caption}</Typography>
                            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setEntrySetting(e.currentTarget)}>
                                <MoreVert />
                            </IconButton>
                        </Box>
                    )}
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                        <Box display="flex" flexDirection="row" gap={1}>
                            <Typography color="#536471" fontSize={14}>@{entry?.username}</Typography>
                            <Divider orientation="vertical"  flexItem/>
                            <Typography color="#536471" fontSize={14}>#{entry?.entry_id}</Typography>
                        </Box>
                        <Typography color="#536471" fontSize={14}>{new Date(entry?.created_at).toLocaleDateString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</Typography>
                    </Box>
                    <Typography>
                        {entry?.content}
                    </Typography>

                    <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1} gap={1}>
                        <Box display="flex" alignItems="center">
                            <IconButton>
                                <ArrowUpward />
                            </IconButton>
                            <Typography>{entry?.likes?.filter(item => item.type === 1)?.length}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <IconButton>
                                <ArrowDownward />
                            </IconButton>
                            <Typography>{entry?.likes?.filter(item => item.type === 0)?.length}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <IconButton>
                                <Favorite />
                            </IconButton>
                            <Typography>{entry?.favorites?.length}</Typography>
                        </Box>
                        <IconButton>
                            <Badge badgeContent={entry?.comments?.length} max={10} color="error">
                                <ChatBubbleOutline />
                            </Badge>
                        </IconButton>
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