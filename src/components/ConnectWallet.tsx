import { type FunctionComponent, useState } from "react";
import { getEthereumProvider } from "@utils/ethereum";
interface ConnectWalletProps {
  onConnect: (account: string, chainId: number) => void;
}

export const ConnectWallet: FunctionComponent<ConnectWalletProps> = ({ onConnect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    const provider = await getEthereumProvider();

    if (provider) {
      setIsLoading(true);
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();

        onConnect(address, Number(network.chainId));
      } catch (error: any) {
        console.error("Error connecting wallet:", error);
        if (error.code === 4001) {
          alert("Connection request rejected by user.");
        } else {
          alert("An unexpected error occurred while connecting the wallet.");
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("No Ethereum provider detected. Install MetaMask.");
    }
  };

  return (
    <button onClick={connectWallet} disabled={isLoading}>
      {isLoading ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};