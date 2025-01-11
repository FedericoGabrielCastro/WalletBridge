import { type FunctionComponent, useState } from "react";
import { getBalance } from "@utils/ethereum";

interface AccountBalanceProps {
  account: string;
}

export const AccountBalance: FunctionComponent<AccountBalanceProps> = ({ account }) => {
  const [balance, setBalance] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const result = await getBalance(account);
      setBalance(result);
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance.");
    }
  };

  return (
    <div>
      <button onClick={fetchBalance}>Get Balance</button>
      {balance && <p>Balance: {balance} ETH</p>}
    </div>
  );
};
