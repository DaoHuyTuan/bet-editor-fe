import { useCallback } from 'react'
import { useAccount } from 'wagmi'
import { connect, signMessage, switchChain } from 'wagmi/actions'
import { config } from '../../wagmi'
import { injected } from 'wagmi/connectors'
import { API_URL } from '../../utils/variable'
import Cookies from 'js-cookie'
export const Connect = () => {
  const account = useAccount()

  const login = useCallback(
    async (signature: string) => {
      try {
        const res = await fetch(`${API_URL}/auth/sign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: account.address?.toLowerCase(),
            signature
          })
        })
        if (res.ok) {
          const data = await res.json()
          console.log('data', data)
          Cookies.set('token', data.t)
          loginWithToken()
        } else {
        }
      } catch (error) {
        debugger
        console.log('error', error)
      }
    },
    [account]
  )

  const createSignature = useCallback(
    async ({ nonce }: { nonce: string }) => {
      try {
        const signature = await signMessage(config, {
          message: nonce
        })
        login(signature)
        console.log('signature', signature)
      } catch (error) {}
    },
    [account]
  )

  const getNonce = useCallback(async () => {
    try {
      await switchChain(config, { chainId: 1 })
      const result = await fetch(`${API_URL}/auth/nonce`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address: account.address?.toLowerCase() })
      })
      if (result.ok) {
        const data = await result.json()
        const nonce = data.nonce
        createSignature({ nonce })
      } else {
        const data = await result.json()
        debugger
        if (data.error_code == 'USER_NOT_FOUND') {
          createSignature({ nonce: data.nonce })
        }
      }
      console.log('result', result)
    } catch (error) {}
  }, [account])

  const connectWallet = useCallback(async () => {
    const result = await connect(config, { connector: injected() })
    console.log('result', result)
    getNonce()
  }, [])

  const loginWithToken = useCallback(async () => {
    try {
      const cookie = Cookies.get('token')
      const result = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookie}`
        }
      })
      if (result.ok) {
        const data = await result.json()
        console.log('data', data)
      } else {
        const data = await result.json()
        debugger
      }
    } catch (error) {}
  }, [])

  return (
    <button
      onClick={connectWallet}
      className="text-[14px] border-[2px] border-[#18181b] px-[30px] py-[3px] bg-[#18181b] text-[white] rounded-[4px] leading-[22px] hover:bg-[white] hover:text-[#18181b]">
      Connect
    </button>
  )
}
