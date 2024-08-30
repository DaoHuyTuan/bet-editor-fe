import { useCallback } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { connect, signMessage, switchChain } from "wagmi/actions";
import { config } from "../../wagmi";
import { injected } from "wagmi/connectors";
import { API_URL } from "../../utils/variable";
export const Connect = () => {
  const account = useAccount();

  const login = useCallback(
    async (signature: string) => {
      try {
        const res = await fetch(`${API_URL}/auth/sign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: account.address?.toLowerCase(),
            signature,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          console.log("data", data);
        }
      } catch (error) {}
    },
    [account]
  );

  const createSignature = useCallback(
    async ({ nonce }) => {
      try {
        const signature = await signMessage(config, {
          message: nonce,
        });
        login(signature);
        console.log("signature", signature);
      } catch (error) {}
    },
    [account]
  );

  const getNonce = useCallback(async () => {
    try {
      await switchChain(config, { chainId: 1 });
      const result = await fetch(`${API_URL}/auth/nonce`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: account.address?.toLowerCase() }),
      });
      if (result.ok) {
        const data = await result.json();
        const nonce = data.nonce;
        createSignature({ nonce });
      }
      console.log("result", result);
    } catch (error) {}
  }, [account]);

  const connectWallet = useCallback(async () => {
    const result = await connect(config, { connector: injected() });
    console.log("result", result);
    getNonce();
  }, []);

  return <button onClick={connectWallet}>Connect</button>;
};
