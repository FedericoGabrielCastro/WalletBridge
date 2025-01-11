import { useState, useEffect, type FunctionComponent } from "react";
import { generateQRCode } from "@utils/ethereum";
interface WalletQRCodeProps {
    uri: string;
}

export const WalletQRCode: FunctionComponent<WalletQRCodeProps> = ({ uri }) => {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    const createQRCode = async () => {
      try {
        const qr = await generateQRCode(uri);
        setQrCode(qr);
      } catch (error) {
        console.error("Failed to generate QR code:", error);
      }
    };

    createQRCode();
  }, [uri]);

  return (
    <div>
      <h3>Scan this QR to Connect</h3>
      {qrCode ? (
        <img src={qrCode} alt="WalletConnect QR Code" style={{ width: 200, height: 200 }} />
      ) : (
        <p>Generating QR code...</p>
      )}
    </div>
  );
};
