import MainLayout from "@/components/common/Layouts/MainLayout/MainLayout";
import Login from "@/components/pages/login/Login";
import { setCaptionLoading, setCaptionPagination, setLeftSideBar } from "@/features/caption/caption";
import { setTopicData } from "@/features/topic/topic";
import { useAppDispatch, useAppSelector } from "@/hooks";
import useUpdateEffect from "@/hooks/useUpdateEffect";
import { getCaptions, getTopics } from "@/services/api";
import Head from "next/head";

export default function LoginPage() {
  const { brandName } = useAppSelector(state => state.app);
  const { login } = useAppSelector(state => state.auth);
  const { captions } = useAppSelector(state => state.caption);
  const { topic_data } = useAppSelector(state => state.topic);
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

  }, [dispatch]);


  return (
    <>
      <Head>
        <title>Giriş Yap | {brandName}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout login={login}>
        <Login />
      </MainLayout>
    </>
  )
}