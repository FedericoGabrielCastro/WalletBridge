import { type FunctionComponent, useState } from "react";
import { sendTransaction } from "@utils/ethereum";

export const SendTransaction: FunctionComponent = () => {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleSendTransaction = async () => {
    try {
      const hash = await sendTransaction(to, amount);
      setTransactionHash(hash);
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Failed to send transaction.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSendTransaction}>Send Transaction</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};
