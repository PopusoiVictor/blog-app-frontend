import '../styles/globals.css';
import Tabs from '@/components/Tabs';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext'; 

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Tabs />
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;

