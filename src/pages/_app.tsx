import MetaMaskAccountProvider from '../providers/MetaMaskProvider';
import type { AppProps } from 'next/app';
import type { MetaMaskInpageProvider } from "@metamask/providers";

import '../styles/globals.scss';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskAccountProvider>
      <Component {...pageProps} />
    </MetaMaskAccountProvider>
  )
}

export default MyApp
