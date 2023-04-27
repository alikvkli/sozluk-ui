import { useState } from "react";
import { Mail, Notifications } from "@mui/icons-material";
import { Alert, Avatar, Badge, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import * as Styled from "./Navbar.styles";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { LoginSettingsProps } from "@/features/auth/auth.types";
import { setLogout } from "@/features/auth/auth";

const LoginNavbar = () => {
    const dispatch = useAppDispatch();
    const { loginSettings } = useAppSelector(state => state.auth);
    const [settingMenu, setSettingMenu] = useState<null | HTMLElement>(null);
    const [notificationMenu, setNotificationMenu] = useState<null | HTMLElement>(null);
    const [messageMenu, setMessageMenu] = useState<null | HTMLElement>(null);



    const handleCloseMessageMenu = () => {
        setMessageMenu(null);
    }

    const handleCloseNotificationMenu = () => {
        setNotificationMenu(null);
    }

    const handleCloseSettingMenu = () => {
        setSettingMenu(null);
    };

    const handleSettingsClick = (key:string) => {
        switch (key) {
            case 'logout':
                dispatch(setLogout())
                break;
            default:
                handleCloseSettingMenu();
                break;
        }
    }

    return (
        <>
            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setMessageMenu(e.currentTarget)} size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                    <Mail />
                </Badge>
            </IconButton>
            <IconButton onClick={(e: React.MouseEvent<HTMLElement>) => setNotificationMenu(e.currentTarget)} size="large" sx={{ mr: 2 }} aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
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
                <Styled.StyledNotificationContainer>
                    <Styled.StyledNotificationTitle>
                        <Box display="flex" alignItems="center" justifyContent="flex-start">
                            <Typography>Bildirimlerim</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Styled.StyledNotificationTitle>

                    <Alert severity="info">Herhangi bir bildiriminiz bulunmamaktadır.</Alert>
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
                {loginSettings.map((setting: LoginSettingsProps,i:number) => (
                    <MenuItem key={i} onClick={() => handleSettingsClick(setting.key)}>
                        <Typography textAlign="center">{setting.value}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default LoginNavbar;