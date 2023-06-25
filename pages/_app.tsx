import '@/styles/globals.css'
import 'node_modules/nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import nProgress from 'nprogress'

interface Props {
  session?: Session | null
}

nProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => nProgress.start())
Router.events.on('routeChangeComplete', () => nProgress.done())
Router.events.on('routeChangeError', () => nProgress.done())

export default function App({ Component, pageProps }: AppProps<Props>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
