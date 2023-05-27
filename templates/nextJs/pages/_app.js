import Head from 'next/head';
import Router from 'next/router';

import '@assets/styles/main.scss';
import { useStore } from '@reducers/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';

NProgress.configure({ showSpinner: true });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Next Template</title>
      </Head>
      <Provider store={store}>{getLayout(<Component {...pageProps} />)}</Provider>
    </>
  );
}

export default MyApp;
