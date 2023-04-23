import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {  Grid3x3, Lightbulb, Mail, MenuBook, Notifications, Person } from '@mui/icons-material';
import { useAppSelector } from '@/hooks';
import * as Styled from "./Navbar.styles"
import { Search } from '@mui/icons-material';
import { Alert, Badge, Divider, Pagination } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';

const settings = ['Profilim', 'Ayarlar', 'Çıkış yap'];

const Navbar = () => {
    const { brandName } = useAppSelector(state => state.app)
    const [settingMenu, setSettingMenu] = React.useState<null | HTMLElement>(null);
    const [notificationMenu, setNotificationMenu] = React.useState<null | HTMLElement>(null);
    const [messageMenu, setMessageMenu] = React.useState<null | HTMLElement>(null);
    const [searchMenu, setSearchMenu] = React.useState<null | HTMLElement>(null);

    const handleCloseSearchMenu = () => {
        setSearchMenu(null);
    }

    const handleCloseMessageMenu = () => {
        setMessageMenu(null);
    }

    const handleCloseNotificationMenu = () => {
        setNotificationMenu(null);
    }

    const handleCloseSettingMenu = () => {
        setSettingMenu(null);
    };

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Box display="flex" flex={1} alignItems="center" justifyContent="space-between">

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <MenuBook sx={{ display: 'flex', mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component='span'
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                {brandName}
                            </Typography>
                        </Box>


                        <Box flex={1} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                            <Styled.Search >
                                <Styled.SearchIconWrapper>
                                    <Search />
                                </Styled.SearchIconWrapper>
                                <Styled.StyledInputBase placeholder='Başık, #entry, @yazar' inputProps={{ "aria-label": 'search' }} />
                            </Styled.Search>
                            <Styled.StyledSearchButton onClick={(e: React.MouseEvent<HTMLElement>) => setSearchMenu(e.currentTarget)}>
                                <Search color='action' />
                            </Styled.StyledSearchButton>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
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
                                anchorEl={searchMenu}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(searchMenu)}
                                onClose={handleCloseSearchMenu}>
                                <Styled.StyledSearchContainer display="flex" flexDirection="column">
                                    <Styled.StyledNotificationTitle>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Typography>Arama sonuçları</Typography>
                                            <Typography color="GrayText" fontSize={14}>Toplam 29 adet sonuç bulundu.</Typography>

                                        </Box>
                                        <Divider sx={{ my: 1 }} />
                                    </Styled.StyledNotificationTitle>

                                    <Styled.StyledSearchItem display="flex" alignItems="center">
                                        <Avatar>
                                            <Person />
                                        </Avatar>
                                        <Box display="flex" flexDirection="column">
                                            <Typography>@tesla</Typography>
                                            <Typography color="GrayText" fontSize={14}>18 takipçi | 24 başlık | 12 entry</Typography>
                                        </Box>
                                    </Styled.StyledSearchItem>
                                    <Styled.StyledSearchItem display="flex" alignItems="center">
                                        <Avatar>
                                            <Lightbulb />
                                        </Avatar>
                                        <Box display="flex" flexDirection="column">
                                            <Typography>game of thrones'un tek cümlelik özeti</Typography>
                                            <Typography color="GrayText" fontSize={14}>18 entry | 04.06.2023 14:28</Typography>
                                        </Box>
                                    </Styled.StyledSearchItem>
                                    <Styled.StyledSearchItem display="flex" alignItems="center">
                                        <Avatar>
                                            <Grid3x3 />
                                        </Avatar>
                                        <Box display="flex" flexDirection="column">
                                            <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo iusto autem omnis, eum tempore iste dolorum aspernatur. Sunt et, nisi quae alias ipsa quasi. Maiores veritatis illum delectus quibusdam ipsam.</Typography>
                                            <Typography color="GrayText" fontSize={14}>01.06.2023 14:28</Typography>

                                        </Box>
                                    </Styled.StyledSearchItem>
                                    <Styled.StyledSearchPaginationContainer display="flex" justifyContent="center">
                                        <Pagination onChange={(event: React.ChangeEvent<unknown>, page: number) => console.log(page)} count={10} />
                                    </Styled.StyledSearchPaginationContainer>
                                </Styled.StyledSearchContainer>
                            </Menu>

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
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseSettingMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;
