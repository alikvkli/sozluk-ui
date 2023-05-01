import MainLayout from "@/components/common/Layouts/MainLayout/MainLayout";
import EntryDetail from "@/components/pages/entry/EntryDetail";
import { setCaptionLoading, setCaptionPagination, setLeftSideBar } from "@/features/caption/caption";
import { setEntryDetail } from "@/features/entry/entry";
import { setNotificationPagitanion, setNotifications } from "@/features/notification/notification";
import { setTopicData } from "@/features/topic/topic";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import { getCaptions, getEntryById, getNotifications, getTopics } from "@/services/api";
import { EntryDetailProps } from "@/types/pages";
import Head from "next/head";
import { GetServerSideProps } from "next/types";

export default function EntryPage(props: EntryDetailProps) {
    const { brandName } = useAppSelector(state => state.app);
    const { captions } = useAppSelector(state => state.caption);
    const { topic_data } = useAppSelector(state => state.topic);
    const { login, token } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch();

    const fecthCaptions = async () => {
        dispatch(setCaptionLoading(true));
        await getCaptions({ page: 1 }).then(res => {
            dispatch(setLeftSideBar(res.payload.data))
            dispatch(setCaptionPagination({ page: res.payload.pagination.current_page, total: res.payload.pagination.total_pages }))
        }).finally(() => {
            dispatch(setCaptionLoading(false));
        })
    }

    const fecthTopics = async () => {
        await getTopics().then(res => {
            dispatch(setTopicData(res.payload));
        })
    }

    useUpdateEffect(() => {
        if (captions.length === 0) {
            fecthCaptions();
        }
        if (topic_data.length === 0) {
            fecthTopics();
        }
        dispatch(setEntryDetail(props.entry.payload[0]))
    }, [dispatch]);

    useUpdateEffect(() => {
        if (login) {
            fetchNotifications();
        }
    }, [dispatch, login])

    const fetchNotifications = async () => {
        await getNotifications({ page: 1, token: token }).then((res) => {
            dispatch(setNotifications(res.payload.data));
            dispatch(setNotificationPagitanion({ total: res.payload.pagination.total, total_pages: res.payload.pagination.total_pages, page: res.payload.pagination.current_page,unread_count:res.payload.pagination.unread_count }));
        }).catch(error => {
            console.log(error)
        });
    }

    return (
        <>
            <Head>
                <title>Anasayfa | {brandName} </title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <EntryDetail />
            </MainLayout>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const entry = await getEntryById(Number(context.query.id))
    return {
        props: {
            entry: entry
        },
    }
}
