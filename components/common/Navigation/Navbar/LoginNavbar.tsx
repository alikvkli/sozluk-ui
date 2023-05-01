import React, { useState } from "react";
import { Mail, Notifications } from "@mui/icons-material";
import { Alert, Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Pagination, Tooltip, Typography } from "@mui/material";
import * as Styled from "./Navbar.styles";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LoginSettingsProps } from "@/features/auth/auth.types";
import { setLogout } from "@/features/auth/auth";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { NotificationProps } from "../../../../types/api/notification";
import theme from "@/config/theme";
import { getNotifications, readAsNotification } from "@/services/api";
import { readNotification, setNotificationPagitanion, setNotifications } from "@/features/notification/notification";
import { convertLocaleDate } from "@/utils";

const LoginNavbar = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loginSettings, token } = useAppSelector(state => state.auth);
    const [settingMenu, setSettingMenu] = useState<null | HTMLElement>(null);
    const [notificationMenu, setNotificationMenu] = useState<null | HTMLElement>(null);
    const [messageMenu, setMessageMenu] = useState<null | HTMLElement>(null);
    const { notifications, pagination } = useAppSelector(state => state.notification);


    const handleCloseMessageMenu = () => {
        setMessageMenu(null);
    }

    const handleCloseNotificationMenu = () => {
        setNotificationMenu(null);
    }

    const handleCloseSettingMenu = () => {
        setSettingMenu(null);
    };

    const handleSettingsClick = (key: string) => {
        switch (key) {
            case 'logout':
                dispatch(setLogout())
                break;
            default:
                handleCloseSettingMenu();
                break;
        }
    }

    const listNotifications = async (e: React.MouseEvent<HTMLElement>) => {
        setNotificationMenu(e.currentTarget);
    }

    const handleNotificationClick = async (item: NotificationProps) => {
        await readAsNotification({ notification_id: item.id, token: token }).then(res => {
            dispatch(readNotification(res.payload));
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            router.push(`/${item.data.related_data_url}`);
        })
    }

    const fetchNotifications = async (page?: number) => {
        await getNotifications({ page: page || 1, token: token }).then((res) => {
            dispatch(setNotifications(res.payload.data));
            dispatch(setNotificationPagitanion({ total: res.payload.pagination.total, total_pages: res.payload.pagination.total_pages, page: res.payload.pagination.current_page, unread_count: res.payload.pagination.unread_count }));
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <>
            {/*             <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setMessageMenu(e.currentTarget)} size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <Mail />
                </Badge>
            </IconButton> */}
            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => listNotifications(e).then(() => fetchNotifications(1))} size="large" sx={{ mr: 2 }} aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={pagination?.unread_count || 0} color="error">
                    <Notifications />
                </Badge>
            </IconButton>
            <Tooltip title="Profil ayarlarım">
                <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setSettingMenu(e.currentTarget)} sx={{ p: 0 }}>
                    <Avatar>A</Avatar>
                </IconButton>
            </Tooltip>


            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={notificationMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(notificationMenu)}
                onClose={handleCloseNotificationMenu}>
                <Styled.StyledNotificationContainer display="flex" flexDirection="column">
                    <Styled.StyledNotificationTitle>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Typography>Bildirimlerim</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Styled.StyledNotificationTitle>
                    {notifications.length === 0 && <Alert severity="info">Herhangi bir bildiriminiz bulunmamaktadır.</Alert>}
                    {notifications.map(item => (
                        <Styled.NotificationItemContainer key={uuid()} display="flex" alignItems="flex-start">
                            <Avatar sx={{ bgcolor: !item.read_at ? theme.palette.primary.main : "#bdbdbd" }}>
                                <Notifications />
                            </Avatar>
                            <Box sx={{ cursor: "pointer" }} component="a" onClick={() => handleNotificationClick(item)}>
                                <Typography sx={{ color: deepPurple[500] }} fontSize={14} >@{item.username}</Typography>
                                <Typography sx={{ color: "#000" }} fontSize={14} >{item.data.message}</Typography>
                                <Typography color="GrayText" fontSize={14} >{convertLocaleDate(item.created_at)}</Typography>
                            </Box>
                        </Styled.NotificationItemContainer>
                    ))}
                    {pagination && pagination.total_pages > 1 && (
                        <Styled.NotificationPaginationContainer marginTop="auto" pt={2} display="flex" justifyContent="center">
                            <Pagination page={pagination.page} onChange={(event: React.ChangeEvent<unknown>, page: number) => fetchNotifications(page)} count={pagination.total_pages || 1} />
                        </Styled.NotificationPaginationContainer>
                    )}
                </Styled.StyledNotificationContainer>
            </Menu>

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={messageMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(messageMenu)}
                onClose={handleCloseMessageMenu}>
                <Styled.StyledNotificationContainer>
                    <Styled.StyledNotificationTitle>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Typography>Mesajlarım</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Styled.StyledNotificationTitle>

                    {[...Array(10)].map((item, key) => (
                        <Styled.StyledMessageContainer key={key} display="flex" alignItems="flex-start">
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                            <Box>
                                <Typography sx={{ color: deepPurple[500] }} fontSize={14} >@ali_kvkli</Typography>
                                <Typography sx={{ color: "#000" }} fontSize={14} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, repudiandae est esse, eum quod perspiciatis molestias sunt veniam molestiae quo reprehenderit culpa architecto necessitatibus adipisci unde minus libero ducimus similique!</Typography>
                            </Box>
                        </Styled.StyledMessageContainer>
                    ))}

                </Styled.StyledNotificationContainer>
            </Menu>

            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={settingMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(settingMenu)}
                onClose={handleCloseSettingMenu}>
                {loginSettings.map((setting: LoginSettingsProps, i: number) => (
                    <MenuItem key={i} onClick={() => handleSettingsClick(setting.key)}>
                        <Typography textAlign="center">{setting.value}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default LoginNavbar;