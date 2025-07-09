import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
// import { PerformanceMonitor } from '@/components/ui/performance-monitor'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MituGym - Premium Fitness Experience</title>
        <meta
          content="Transform your body with premium fitness equipment, expert trainers, and a supportive community at MituGym."
          name="description"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div className="dark min-h-screen bg-background">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />

        {/* Performance Monitor - Disabled */}
        {/* {process.env.NODE_ENV === 'development' && (
          <PerformanceMonitor 
            showDebugInfo={true}
            position="bottom-right"
          />
        )} */}
      </div>
    </>
  );
}
