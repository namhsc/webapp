import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { Shield } from '@/components/Auth/Shield';
import { EmptyLayout } from '@/components/layout/EmptyLayout';

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
  );
};

export default App;
