import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useChainId, useConnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { config } from "../../utils/config";
import { connect, signMessage, switchChain } from "@wagmi/core";
import { CHAIN_ID } from "../../utils/constants";

export const Connect = () => {
  const { connectors, status, error } = useConnect();
  const chainId = useChainId();
  const { address } = useAccount();
  const getSignMessage = async () => {
    try {
      debugger;
      if (chainId === CHAIN_ID) {
        const result = await connect(config, { connector: injected() });
        if (result) {
          console.log("result", result);
        }
      } else {
        switchChain(config, { chainId: CHAIN_ID });
        debugger;

        const result = await connect(config, { connector: injected() });
        if (result) {
          console.log("result", result);
        }
        const signature = await signMessage(config, {
          message: "Connect to the app",
          account: address,
        });
        debugger;
      }
    } catch (error) {}
  };
  return (
    <div className="self-end">
      <button onClick={() => getSignMessage()}>Connect</button>
    </div>
  );
};
