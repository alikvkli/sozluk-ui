import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { MenuBook } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import LoginNavbar from './LoginNavbar';
import SearchBar from './Search';
import { clearActiveCaption } from '@/features/caption/caption';

const Navbar = () => {
    const { brandName } = useAppSelector(state => state.app);
    const { login } = useAppSelector((state) => state.auth)
    const [searchMenu, setSearchMenu] = useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch();
    const router = useRouter();



    const routeToHome = () => {
        dispatch(clearActiveCaption());
        router.push("/");
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <Box display="flex" flex={1} alignItems="center" justifyContent="space-between">
                        <Box sx={{ display: 'flex', alignItems: 'center', cursor: "pointer" }} onClick={() => routeToHome()}>
                            <MenuBook sx={{ display: 'flex', mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component='span'
                                sx={{
                                    mr: 2,
                                    textTransform:"uppercase",
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}>
                                {brandName}
                            </Typography>
                        </Box>

                        <SearchBar searchMenu={searchMenu} setSearchMenu={setSearchMenu} />

                        <Box sx={{ flexGrow: 0 }}>
                            {login ? (
                                <LoginNavbar />
                            ) : (
                                <>
                                    <Button component="a" onClick={() => router.push("/giris-yap")} variant="outlined" sx={{ color: "#fff" }}>Giriş Yap</Button>
                                    <Button component="a" onClick={() => router.push("/kayit-ol")} variant="outlined" sx={{ color: "#fff" }}>Kayıt Ol</Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
}
export default Navbar;
