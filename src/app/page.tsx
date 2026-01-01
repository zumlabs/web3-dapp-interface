import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Navigation */}
      <nav className="border-b border-[#1a1a1a] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-semibold text-white">⬡ Nexus</span>
            <div className="hidden md:flex items-center gap-6 text-[#808080] text-sm">
              <a href="#" className="hover:text-white transition-colors">Swap</a>
              <a href="#" className="hover:text-white transition-colors">Pool</a>
              <a href="#" className="hover:text-white transition-colors">Stake</a>
              <a href="#" className="hover:text-white transition-colors">Bridge</a>
            </div>
          </div>
          <WalletConnect />
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-lg mx-auto mt-20 px-4">
        {/* Swap Card */}
        <div className="bg-[#131313] rounded-2xl border border-[#1a1a1a] p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-medium">Swap</span>
            <button className="text-[#808080] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* From Input */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-1">
            <div className="flex justify-between mb-2">
              <span className="text-[#808080] text-sm">You pay</span>
              <span className="text-[#808080] text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="text" 
                placeholder="0" 
                className="bg-transparent text-3xl text-white outline-none w-full"
              />
              <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] px-3 py-2 rounded-xl transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#627eea]"></div>
                <span className="text-white font-medium">ETH</span>
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-2 relative z-10">
            <button className="bg-[#1a1a1a] border-4 border-[#131313] rounded-xl p-2 hover:bg-[#252525] transition-colors">
              <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

          {/* To Input */}
          <div className="bg-[#1a1a1a] rounded-xl p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#808080] text-sm">You receive</span>
              <span className="text-[#808080] text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between">
              <input 
                type="text" 
                placeholder="0" 
                className="bg-transparent text-3xl text-white outline-none w-full"
              />
              <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] px-3 py-2 rounded-xl transition-colors">
                <div className="w-6 h-6 rounded-full bg-[#2775ca]"></div>
                <span className="text-white font-medium">USDC</span>
                <svg className="w-4 h-4 text-[#808080]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Connect/Swap Button */}
          <button className="w-full bg-[#4c82fb] hover:bg-[#3a6fd8] text-white font-semibold py-4 rounded-xl transition-colors">
            Connect Wallet
          </button>
        </div>

        {/* Info */}
        <div className="flex items-center justify-center gap-4 mt-6 text-[#808080] text-xs">
          <span>Powered by Ethereum</span>
          <span>•</span>
          <span>Gas: 12 gwei</span>
        </div>
      </main>
    </div>
  );
}
