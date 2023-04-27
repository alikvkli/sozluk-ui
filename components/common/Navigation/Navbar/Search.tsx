import { Avatar, Box, Divider, Menu, Pagination, Typography } from "@mui/material";
import * as Styled from "./Navbar.styles";
import { Grid3x3, Lightbulb, Person, Search } from "@mui/icons-material";
import { FC } from "react";
import { SearchBarProps } from "./Navbar.types";

const SearchBar: FC<SearchBarProps> = ({ searchMenu, setSearchMenu }) => {

    const handleCloseSearchMenu = () => {
        setSearchMenu(null);
    }
    return (
        <>
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
        </>
    )
}

export default SearchBar;