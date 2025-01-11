import { type FunctionComponent, useState } from "react";
import { signMessage } from "@utils/ethereum";

export const SignMessage: FunctionComponent = () => {
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignMessage = async () => {
    try {
      const result = await signMessage(message);
      setSignature(result);
    } catch (error) {
      console.error("Error signing message:", error);
      alert("Failed to sign message.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Message to sign"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSignMessage}>Sign Message</button>
      {signature && <p>Signature: {signature}</p>}
    </div>
  );
};
