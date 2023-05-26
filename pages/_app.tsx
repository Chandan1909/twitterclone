import '@/styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import LoginModel from '@/components/models/LoginModel';
import RegisterModel from '../components/models/RegisterModel';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster/>
      <RegisterModel/>
      <LoginModel/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
