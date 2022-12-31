import { SessionProvider } from "next-auth/react";
import Layout from '../components/Layout';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return(
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp
