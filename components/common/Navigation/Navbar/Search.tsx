import { Avatar, Box, CircularProgress, Divider, Menu, Pagination, SelectChangeEvent, Typography } from "@mui/material";
import * as Styled from "./Navbar.styles";
import { Grid3x3, Lightbulb, Person, Search } from "@mui/icons-material";
import { ChangeEvent, FC, Fragment, useState } from "react";
import { SearchBarProps } from "./Navbar.types";
import { handleEnterKeyPress } from "@/utils";
import { createCaption, search } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { NotificationState } from "@/components/pages/register/Register.types";
import Notification from "@/components/common/Notification/Notification";
import { setSearchData, setPage, clearSearchData } from "@/features/search/search";
import { DataProps } from "../../../../types/api/search";
import EntryEditor from "../../EntryEditor/EntryEditor";
import { useRouter } from "next/router";
import { TopicProps } from "../../../../types/api/topics";


const SearchBar: FC<SearchBarProps> = ({ searchMenu, setSearchMenu }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { topic_data } = useAppSelector(state => state.topic)
    const { search_data, paginations } = useAppSelector(state => state.search);
    const { token } = useAppSelector(state => state.auth);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>("");
    const [notification, setNotification] = useState<NotificationState>({ open: false, message: "", type: "error" });
    const [text, setText] = useState<string>("");
    const [selectTopic, setSelectTopic] = useState<TopicProps>(topic_data[0]);

    const handleCloseSearchMenu = () => {
        setSearchMenu(null);
        dispatch(clearSearchData())
    }

    const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLElement>) => {
        if (searchText.length < 1) {
            return;
        }
        setSearchMenu(e.currentTarget);
        fetchSearchData();
    }

    const fetchSearchData = async (page?: number) => {
        setLoading(true)
        await search({ query: searchText, page: page ?? paginations.page }).then((res) => {
            if (res.payload.data.length > 0) {
                dispatch(setSearchData(res.payload.data));
                dispatch(setPage({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages, records: res.payload.pagination.total }))
            } else {
                // data bulunmadı
            }
        }).catch(error => {
            console.log(error)
            setSearchMenu(null);
            setNotification({ open: true, message: error.response.data.message || "Teknik bir hata oluştu, Lütfen tekrar deneyiniz!", type: "error" });
        }).finally(() => {

            setLoading(false)
        })
    }

    const handleSelectTopic = (event: SelectChangeEvent<TopicProps>) => {
        let findTopic = topic_data.find(item => Number(item.id) === Number(event.target.value));
        if (findTopic) {
            setSelectTopic(findTopic)
        }
    };

    const createEntryWithCaption = async () => {
        await createCaption({ title: searchText, content: text, token: token, topic_id: selectTopic.id }).then((res) => {
            if (res.status === 1) {
                handleCloseSearchMenu();
                setSearchText("");
                setText("");
                setNotification({ open: true, message: res.message, type: "success" });
                res.url && router.push(`/${res.url}`);
            }
        }).catch(error => {
            if (typeof error.response.data.message === 'object' && error.response.data.message !== null) {
                handleCloseSearchMenu();
                setText("");
                setSearchText("");
                setNotification({ open: true, message: "Bu başlık zaten daha önce açılmış, fakat listelenmesi için onay bekleniyor!", type: "error" });
            } else {
                handleCloseSearchMenu();
                setText("");
                setSearchText("");
                setNotification({ open: true, message: error.response.data.message, type: "error" });
            }
        })

    }

    const getTypeComponent = (item: DataProps) => {
        switch (item.type) {
            case "user":
                return (
                    <Styled.StyledSearchItem display="flex" alignItems="center">
                        <Avatar>
                            <Person />
                        </Avatar>
                        <Box display="flex" flexDirection="column">
                            <Typography>@{item.search}</Typography>
                            <Typography color="GrayText" fontSize={14}>
                                {item?.caption_count || 0} başlık |  {item?.entries_count || 0} entry
                            </Typography>
                        </Box>
                    </Styled.StyledSearchItem>
                );
            case "caption":
                return (
                    <Styled.StyledSearchItem display="flex" alignItems="center">
                        <Avatar>
                            <Lightbulb />
                        </Avatar>
                        <Box display="flex"  sx={{ cursor: "pointer" }} component="a" onClick={() => router.push(`/${item.slug}`).finally(() => handleCloseSearchMenu())} flexDirection="column">
                            <Typography>{item.search}</Typography>
                            <Typography color="GrayText" fontSize={14}>
                                {item.entries_count} entry | {new Date(item.created_at as string).toLocaleDateString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                            </Typography>
                        </Box>
                    </Styled.StyledSearchItem>
                );
            case "entry":
                return (
                    <Styled.StyledSearchItem display="flex" alignItems="center">
                        <Avatar>
                            <Grid3x3 />
                        </Avatar>
                        <Box display="flex" sx={{cursor: "pointer"}} flexDirection="column" component="a" onClick={() => router.push(`/entry/${item?.id}`).finally(() => handleCloseSearchMenu())}>
                            <Typography>
                                {item.search}
                            </Typography>
                            <Typography color="GrayText" fontSize={14}>
                                {new Date(item.created_at as string).toLocaleDateString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                            </Typography>
                        </Box>
                    </Styled.StyledSearchItem>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Box flex={1} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                <Styled.Search >
                    <Styled.SearchIconWrapper>
                        <Search />
                    </Styled.SearchIconWrapper>
                    <Styled.StyledInputBase value={searchText} onKeyDown={handleEnterKeyPress(handleSearch)} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)} placeholder='Başık, #entry, @yazar' inputProps={{ "aria-label": 'search' }} />
                </Styled.Search>
                <Styled.StyledSearchButton disabled={loading || searchText.length < 1} onClick={(e: React.MouseEvent<HTMLElement>) => handleSearch(e)}>
                    {loading && <CircularProgress size={24} />}
                    {!loading && <Search color='action' />}
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
                            <Typography color="GrayText" fontSize={14}>Toplam {paginations.records || 0} adet sonuç bulundu.</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                    </Styled.StyledNotificationTitle>
                    {search_data.length === 0 && searchText.charAt(0) !== "#" && !searchText.includes("@") && (
                        <EntryEditor
                            handleSave={createEntryWithCaption}
                            text={text}
                            setText={setText}
                            buttonText="Oluştur"
                            showTopic={true}
                            selectTopic={selectTopic}
                            handleSelectTopic={handleSelectTopic}
                            title={`"${searchText}" hakkında düşüncelerini yaz...`} />
                    )}
                    {search_data && search_data.length > 0 && search_data.map((item, index) => (
                        <Fragment key={index}>{getTypeComponent(item)}</Fragment>
                    ))}
                    {paginations.total > 1 && (
                        <Styled.StyledSearchPaginationContainer pt={2} display="flex" justifyContent="center">
                            <Pagination onChange={(event: React.ChangeEvent<unknown>, page: number) => fetchSearchData(page)} count={paginations.total} />
                        </Styled.StyledSearchPaginationContainer>
                    )}

                </Styled.StyledSearchContainer>
            </Menu>
            <Notification
                duration={4000}
                position={{ vertical: "top", horizontal: "right" }}
                open={notification.open}
                setOpen={() => setNotification({ ...notification, open: false })}
                message={notification.message} type={notification.type} />
        </>
    )
}

export default SearchBar;


