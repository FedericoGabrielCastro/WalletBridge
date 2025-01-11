import { type FunctionComponent, useCallback, useState } from "react";
import { ConnectWallet } from "@components/ConnectWallet";
import { AccountBalance } from "@components/AccountBalance";
import { SignMessage } from "@components/SignMessage";
import { SendTransaction } from "@components/SendTransaction";
import { WalletQRCode } from "@components/WalletQRCode";

export const WalletBridgePage: FunctionComponent = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [uri, setUri] = useState<string | null>(null);

  const handleConnect = useCallback((address: string, chainId: number) => {
    setAccount(address);
    setChainId(chainId);
    setConnected(true);
  }, []);

  const handleGenerateQR = useCallback(() => {
    const generatedUri =
      "wc:12345@1?bridge=https://bridge.walletconnect.org&key=abcdef1234567890";
    setUri(generatedUri);
  }, []);

  return (
    <div>
      <h2>WalletBridge</h2>
      {!connected ? (
        <ConnectWallet onConnect={handleConnect} />
      ) : (
        <div>
          <p>Connected account: {account}</p>
          <p>Chain ID: {chainId}</p>
          <AccountBalance account={account!} />
          <SignMessage />
          <SendTransaction />
          <button onClick={handleGenerateQR}>Generate QR</button>
          {uri && <WalletQRCode uri={uri} />}
        </div>
      )}
    </div>
  );
};
