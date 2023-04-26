import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Head from 'next/head';
import PropTypes from 'prop-types';
import theme from '@/config/theme';
import createEmotionCache from '@/config/createEmotionCache';
import { Provider } from 'react-redux';
import { store,persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

const clientSideEmotionCache = createEmotionCache();



export default function App(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>

  )
}


App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};