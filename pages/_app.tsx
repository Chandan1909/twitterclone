import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import LoginModel from '@/components/models/LoginModel';
import RegisterModel from '../components/models/RegisterModel';
import { Session } from 'next-auth'; 

export default function App({ Component, pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Toaster/>
      <RegisterModel/>
      <LoginModel/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
