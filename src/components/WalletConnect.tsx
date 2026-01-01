"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  async function connectWallet() {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsConnecting(false);
    }
  }

  function disconnect() {
    setAddress("");
    setBalance("");
    setShowDropdown(false);
  }

  async function copyAddress() {
    await navigator.clipboard.writeText(address);
    setShowDropdown(false);
  }

  // Close dropdown on outside click
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
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-white text-sm font-medium">{balance} ETH</span>
          </div>
          <div className="h-4 w-px bg-[#333]"></div>
          <span className="text-[#808080] text-sm">{formatAddress(address)}</span>
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-xl z-50">
            <button
              onClick={copyAddress}
              className="w-full px-4 py-3 text-left text-sm text-[#808080] hover:bg-[#252525] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Address
            </button>
            <button
              onClick={disconnect}
              className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-[#252525] transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
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
