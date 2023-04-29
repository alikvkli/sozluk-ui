import * as React from 'react';
import { Avatar, Badge, Box, Checkbox, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import * as Styled from "./EntryCard.styles"
import { ArrowDownward, ArrowUpward, ChatBubbleOutline, Favorite, FavoriteBorder, MoreVert } from "@mui/icons-material";
import { EntryCardProps } from './EntryCard.types';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useRouter } from 'next/router';
import { clearCaptionEntries, updateEntries } from '@/features/entry/entry';
import { clearActiveCaption } from '@/features/caption/caption';
import { addFavorite, addLike } from '@/services/api';
import { NotificationState } from '@/components/pages/register/Register.types';
import Notification from "@/components/common/Notification/Notification";
import { isMyFavorite, isMyLiked } from '@/utils';


const EntryCard: React.FC<EntryCardProps> = ({ showCaption = true, entry, where }) => {
    const dispatch = useAppDispatch();
    const { login, token, user } = useAppSelector(state => state.auth);
    const router = useRouter();
    const [entrySetting, setEntrySetting] = React.useState<null | HTMLElement>(null);
    const [selectedCheckbox, setSelectedCheckbox] = React.useState(isMyLiked(entry?.likes, user?.username));
    const [checkFavorite, setCheckFavorite] = React.useState(isMyFavorite(entry?.favorites, user?.username));
    const [notification, setNotification] = React.useState<NotificationState>({ open: false, message: "", type: "error" });

    const handleCloseEntryMenu = () => {
        setEntrySetting(null);
    }
    const routeToCaption = (slug: string | undefined) => {
        dispatch(clearCaptionEntries());
        dispatch(clearActiveCaption());
        router.push(`/${slug}`)
    }


    const handleFavorite = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!login) {
            setCheckFavorite(false);
            setNotification({ open: true, message: "İşlemi gerçekleştirebilmek için giriş yapınız!", type: "error" });
            return;
        }
        if (entry.entry_id) {
            await addFavorite({ entry_id: entry.entry_id, token: token }).then(res => {
                if (res.status === 1) {
                    dispatch(updateEntries(res.payload))
                    setCheckFavorite(res.type === "delete" ? false : true);
                } else {
                    setNotification({ open: true, message: res.message, type: "error" });
                }
            });
        }
    }

    const handleLike = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!login) {
            //setSelectedCheckbox(event.target.name);
            setNotification({ open: true, message: "İşlemi gerçekleştirebilmek için giriş yapınız!", type: "error" });
            return;
        }
        if (entry.entry_id && event.target.name) {
            await addLike({ entry_id: entry.entry_id, token: token, type: event.target.name === "A" ? 1 : 2 }).then(res => {
                if (res.status === 1) {
                    dispatch(updateEntries(res.payload))
                    if (res.type === "delete") {
                        setSelectedCheckbox("");
                    } else {
                        setSelectedCheckbox(event.target.name);
                    }
                } else {
                    setNotification({ open: true, message: res.message, type: "error" });
                }
            });
        }
    }



    return (
        <Styled.EntryCardContainer>
            <Box display="flex" flexDirection="row" alignItems="flex-start" gap={1}>
                <Avatar sx={{ width: "48px", height: "48px" }}>A</Avatar>
                <Box display="flex" flex={1} flexDirection="column">
                    {showCaption && (
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Typography component="a" sx={{cursor:"pointer"}} onClick={() => routeToCaption(entry?.caption_slug)} fontWeight={500} fontSize={17}>{entry?.caption}</Typography>
                            {login && (
                                <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setEntrySetting(e.currentTarget)}>
                                    <MoreVert />
                                </IconButton>
                            )}
                        </Box>
                    )}
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
                        <Box display="flex" flexDirection="row" gap={1}>
                            <Typography color="#536471" fontSize={14}>@{entry?.username}</Typography>
                            <Divider orientation="vertical" flexItem />
                            <Typography sx={{cursor:"pointer"}} component="a" onClick={() => router.push(`/entry/${entry?.entry_id}`)} color="#536471" fontSize={14}>#{entry?.entry_id}</Typography>
                        </Box>
                        <Typography color="#536471" fontSize={14}>{new Date(entry?.created_at).toLocaleDateString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</Typography>
                    </Box>
                    <Typography>
                        {entry?.content}
                    </Typography>

                    <Box display="flex" alignItems="center" justifyContent="flex-start" mt={1} gap={1}>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                icon={<ArrowUpward />}
                                checkedIcon={<ArrowUpward />}
                                checked={selectedCheckbox === "A"}
                                onChange={handleLike}
                                name="A"
                            />
                            <Typography>{entry?.likes?.filter(item => item.type === 1)?.length}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                icon={<ArrowDownward />}
                                checkedIcon={<ArrowDownward />}
                                checked={selectedCheckbox === "B"}
                                onChange={handleLike}
                                name="B"
                            />
                            <Typography>{entry?.likes?.filter(item => item.type === 2)?.length}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                checked={checkFavorite}
                                color="error"
                                onChange={handleFavorite}
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                            />
                            <Typography>{entry?.favorites?.length}</Typography>
                        </Box>
                        <IconButton  onClick={() => router.push(`/entry/${entry?.entry_id}`)} >
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
            <Notification
                duration={4000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </Styled.EntryCardContainer>
    )
}

export default EntryCard;