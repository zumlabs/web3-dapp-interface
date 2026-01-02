"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";

export default function WalletConnect() {
  const { address, balance, unlockTime, isLocked, isConnecting, connectWallet, disconnect } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  async function copyAddress() {
    await navigator.clipboard.writeText(address);
    setShowDropdown(false);
  }

  async function handleDisconnect() {
    await disconnect();
    setShowDropdown(false);
  }

  useEffect(() => {
    const handleClick = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showDropdown]);

  if (address) {
    return (
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#252525] border border-[#2a2a2a] px-4 py-2.5 rounded-xl transition-all"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-white text-sm font-medium">
              {balance} ETH
            </span>
          </div>
          <div className="h-4 w-px bg-[#333]" />
          <span className="text-[#808080] text-sm">
            {formatAddress(address)}
          </span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-xl z-50">
            {unlockTime && (
              <div className="px-4 py-3 border-b border-[#2a2a2a] text-sm">
                <div className="text-[#808080]">TimeLock Status</div>
                <div
                  className={`mt-1 font-semibold ${
                    isLocked ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {isLocked ? "Locked" : "Unlocked"}
                </div>
                <div className="text-xs text-[#666] mt-1">
                  {new Date(unlockTime * 1000).toLocaleString()}
                </div>
              </div>
            )}

            <button
              onClick={copyAddress}
              className="w-full px-4 py-3 text-left text-sm text-[#808080] hover:bg-[#252525] hover:text-white transition-colors"
            >
              Copy Address
            </button>

            <button
              onClick={handleDisconnect}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-[#252525] transition-colors"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="bg-[#4c82fb] hover:bg-[#3a6fd8] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
    >
      {isConnecting ? "Connecting..." : "Connect"}
    </button>
  );
}
