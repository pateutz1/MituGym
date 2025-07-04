import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
// import { PerformanceMonitor } from '@/components/ui/performance-monitor'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MituGym - Premium Fitness Experience</title>
        <meta name="description" content="Transform your body with premium fitness equipment, expert trainers, and a supportive community at MituGym." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-background dark">
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
  )
} 