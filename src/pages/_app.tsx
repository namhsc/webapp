import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Shield } from '@/components/Auth/Shield';
import { EmptyLayout } from '@/components/layout/EmptyLayout';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
});

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    Layout?: React.ComponentType;
  };
};

const App: NextPage<AppProps> = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const Layout = Component.Layout || EmptyLayout;
  return (
    <div className={roboto.className}>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <Shield>
            <NextNProgress />
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
          </Shield>
        </QueryClientProvider>
      </Layout>
    </div>
  );
};

export default App;
