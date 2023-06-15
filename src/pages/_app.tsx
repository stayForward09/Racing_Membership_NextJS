import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import { MemberstackProvider } from '@memberstack/react'
import { ToastContainer } from 'react-toastify'

const config = {
  publicKey: "pk_8d71e3671284297b6644"
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MemberstackProvider config={config}>
      <Component {...pageProps} />
      <ToastContainer />
    </MemberstackProvider>
  )
}
