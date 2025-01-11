import { BrowserProvider, ethers } from "ethers";
import QRCode from "qrcode";

export const getEthereumProvider = async (): Promise<BrowserProvider | null> => {
  if (typeof window !== "undefined" && (window as any).ethereum) {
    return new BrowserProvider((window as any).ethereum);
  }
  return null;
};

export const getBalance = async (address: string): Promise<string> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance)
};

export const checkNetwork = async (): Promise<void> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== 1) {
    alert("Please change to Ethereum Mainnet.");
  }
};

export const signMessage = async (message: string): Promise<string> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const signer = await provider.getSigner();
  const signature = await signer.signMessage(message);
  return signature;
};

export const sendTransaction = async (
  to: string,
  amount: string
): Promise<string> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const signer = await provider.getSigner();
  const tx = await signer.sendTransaction({
    to,
    value: ethers.parseEther(amount), 
  });
  await tx.wait(); 
  return tx.hash;
};

export const readContract = async (
  contractAddress: string,
  abi: any[],
  functionName: string,
  args: any[] = []
): Promise<any> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const contract = new ethers.Contract(contractAddress, abi, provider);
  return await contract[functionName](...args);
};

export const writeContract = async (
  contractAddress: string,
  abi: any[],
  functionName: string,
  args: any[] = []
): Promise<string> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const tx = await contract[functionName](...args);
  await tx.wait(); 
  return tx.hash;
};

export const listenToEvents = async (
  contractAddress: string,
  abi: any[],
  eventName: string,
  callback: (...args: any[]) => void
): Promise<void> => {
  const provider = await getEthereumProvider();
  if (!provider) throw new Error("No Ethereum provider detected.");
  const contract = new ethers.Contract(contractAddress, abi, provider);
  contract.on(eventName, (...args) => {
    callback(...args);
  });
};

export const generateQRCode = async (uri: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(uri);
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Error generating QR Code:", error);
    throw new Error("Failed to generate QR Code.");
  }
};