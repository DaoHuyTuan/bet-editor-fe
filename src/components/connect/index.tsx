import { useAccount, useConnect, useDisconnect } from 'wagmi'
export const Connect = () => {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  return (

  )
}