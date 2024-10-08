import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { config } from './wagmi.ts'
import '@rainbow-me/rainbowkit/styles.css'
import './index.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      {/* <RainbowKitProvider> */}
      <App />
      {/* </RainbowKitProvider> */}
    </QueryClientProvider>
  </WagmiProvider>
  // </React.StrictMode>
)
