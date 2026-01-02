"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ethers } from "ethers";
import { TIMELOCK_ABI, TIMELOCK_ADDRESS } from "@/lib/TimeLockWallet";

interface WalletContextType {
  address: string;
  balance: string;
  unlockTime: number | null;
  isLocked: boolean | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [unlockTime, setUnlockTime] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    setIsConnecting(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const bal = await provider.getBalance(addr);

      setAddress(addr);
      setBalance(parseFloat(ethers.formatEther(bal)).toFixed(4));

      // Read contract
      try {
        const contract = new ethers.Contract(
          TIMELOCK_ADDRESS,
          TIMELOCK_ABI,
          provider
        );

        const ts: bigint = await contract.unlockTime();
        const unlock = Number(ts);

        setUnlockTime(unlock);
        setIsLocked(unlock > Math.floor(Date.now() / 1000));
      } catch {
        setUnlockTime(null);
        setIsLocked(null);
      }
    } catch (error: any) {
      // Handle user rejection
      if (error.code === "ACTION_REJECTED" || error.code === 4001) {
        console.log("User cancelled connection");
        return;
      }
      console.error("Failed to connect wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_revokePermissions",
          params: [{ eth_accounts: {} }],
        });
      } catch (error) {
        console.log("Could not revoke permissions:", error);
      }
    }

    setAddress("");
    setBalance("");
    setUnlockTime(null);
    setIsLocked(null);
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        unlockTime,
        isLocked,
        isConnecting,
        connectWallet,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
