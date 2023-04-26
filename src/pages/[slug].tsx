import MainLayout from '@/components/common/Layouts/MainLayout/MainLayout'
import CaptionComponent from '@/components/pages/caption/Caption';
import { setActiveCaption, setCaptionEntries, setCaptionPagination, setLeftSideBar } from '@/features/app/app';
import { setBreadCrumbs } from '@/features/breadcrumbs/breadcrumbs';
import { useAppDispatch } from '@/hooks';
import useUpdateEffect from '@/hooks/useUpdateEffect'
import { getCaptions, getEntries } from '@/services/api';
import { CaptionPageProps } from '@/types/pages';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types';

export default function Caption(props: CaptionPageProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useUpdateEffect(() => {
        dispatch(setLeftSideBar(props.captions))
        dispatch(setBreadCrumbs(props?.entries?.caption?.title));
        dispatch(setActiveCaption(props.entries.caption));
        dispatch(setCaptionEntries(props.entries.data));
        dispatch(setCaptionPagination({ page: props.entries.pagination.current_page, total: props.entries.pagination.total_pages}))
    }, [props, dispatch])
    return (
        <>
            <Head>
                <title>{props.entries.caption?.title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainLayout>
                <CaptionComponent />
            </MainLayout>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    const captionsData = await getCaptions({ page: 1 })
    const captionEntryData = await getEntries({ page: context.query['epage'] || 1, caption: context.query.slug })
    return {
        props: {
            captions: captionsData.payload.data,
            entries: captionEntryData.payload
        },
    }
}