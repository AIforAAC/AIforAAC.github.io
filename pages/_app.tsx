import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Empowering AAC users using AI - Research and product project exploring how modern AI can help augmentative and alternative communication users while preserving personal voice and control." />
        <title>Empowering AAC users using AI</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

