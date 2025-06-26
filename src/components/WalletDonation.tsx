
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Coffee, Copy, ExternalLink, Send } from "lucide-react";

interface WalletAddress {
  network: string;
  address: string;
  icon: string;
  color: string;
}

interface WalletDonationProps {
  variant?: 'hero' | 'contact';
  className?: string;
}

interface CryptoOption {
  symbol: string;
  name: string;
  icon: string;
  decimals: number;
  contractAddress?: string;
}

const WalletDonation = ({ variant = 'contact', className = "" }: WalletDonationProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("ETH");
  const [isSending, setIsSending] = useState(false);

  const walletAddresses: WalletAddress[] = [
    {
      network: "EVM (Ethereum/BSC/Polygon)",
      address: "0x86979D26A14e17CF2E719dcB369d559f3ad41057",
      icon: "⚡",
      color: "from-blue-500 to-purple-600"
    },
    {
      network: "Solana",
      address: "GXysRwrHscn6qoPpw3UYPHPxvcnHQ9YWsmpZwjhgU8bW",
      icon: "🌟",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const cryptoOptions: Record<string, CryptoOption[]> = {
    ethereum: [
      { symbol: "ETH", name: "Ethereum", icon: "⚡", decimals: 18 },
      { symbol: "USDT", name: "Tether USD", icon: "💰", decimals: 6, contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
      { symbol: "USDC", name: "USD Coin", icon: "💵", decimals: 6, contractAddress: "0xA0b86a33E6441a0b48b6a68d3e1F6e5CC6abCB2d" }
    ],
    solana: [
      { symbol: "SOL", name: "Solana", icon: "🌟", decimals: 9 },
      { symbol: "USDC", name: "USD Coin", icon: "💵", decimals: 6 }
    ]
  };

  const copyToClipboard = async (address: string, network: string) => {
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied!",
        description: `${network} address copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setConnectedAddress(accounts[0]);
        setIsConnected(true);
        toast({
          title: "Wallet Connected!",
          description: "You can now send donations directly",
        });
      } else {
        toast({
          title: "Wallet not found",
          description: "Please install MetaMask or another Web3 wallet",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const sendCrypto = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const selectedCryptoData = cryptoOptions[selectedNetwork].find(crypto => crypto.symbol === selectedCrypto);
      const toAddress = walletAddresses.find(w => w.network.toLowerCase().includes(selectedNetwork))?.address;
      
      if (!selectedCryptoData || !toAddress) {
        throw new Error("Invalid crypto or address");
      }

      // Convert amount to wei/smallest unit
      const amountInWei = (parseFloat(amount) * Math.pow(10, selectedCryptoData.decimals)).toString(16);

      if (selectedCryptoData.contractAddress) {
        // ERC-20 token transfer
        const data = `0xa9059cbb000000000000000000000000${toAddress.slice(2)}${amountInWei.padStart(64, '0')}`;
        
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAddress,
            to: selectedCryptoData.contractAddress,
            data: data,
          }],
        });
      } else {
        // Native token transfer (ETH/SOL)
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAddress,
            to: toAddress,
            value: `0x${amountInWei}`,
          }],
        });
      }

      toast({
        title: "Transaction Sent!",
        description: `${amount} ${selectedCrypto} has been sent successfully!`,
      });
      
      setAmount("");
    } catch (error: any) {
      toast({
        title: "Transaction failed",
        description: error.message || "Failed to send transaction",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const isHeroVariant = variant === 'hero';

  return (
    <div className={`${className} ${isHeroVariant ? 'text-center' : ''}`}>
      <div className={`${isHeroVariant ? 'mb-6' : 'mb-4'} space-y-2`}>
        <div className="flex items-center gap-2 justify-center">
          <Coffee className={`${isHeroVariant ? 'w-5 h-5' : 'w-4 h-4'} text-orange-400`} />
          <h3 className={`${isHeroVariant ? 'text-lg' : 'text-base'} font-semibold ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
            Buy Me a Coffee ☕
          </h3>
        </div>
        <p className={`${isHeroVariant ? 'text-purple-200' : 'text-muted-foreground'} text-sm`}>
          Support my work through crypto donations
        </p>
      </div>

      {!isConnected ? (
        <>
          <div className="space-y-3 mb-4">
            {walletAddresses.map((wallet, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl border ${
                  isHeroVariant 
                    ? 'bg-white/10 backdrop-blur-sm border-white/20' 
                    : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
                } hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{wallet.icon}</span>
                    <span className={`text-sm font-medium ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                      {wallet.network}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(wallet.address, wallet.network)}
                    className={`${isHeroVariant ? 'text-purple-200 hover:text-white hover:bg-white/10' : ''}`}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
                <div className={`text-xs font-mono break-all ${isHeroVariant ? 'text-purple-100' : 'text-muted-foreground'} mb-3`}>
                  {wallet.address}
                </div>
              </div>
            ))}
          </div>

          <div className={`flex ${isHeroVariant ? 'flex-col sm:flex-row justify-center' : 'flex-row'} gap-3`}>
            <Button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`${
                isHeroVariant 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 rounded-xl px-6 py-2' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 rounded-xl'
              } transition-all duration-300`}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {isConnecting ? "Connecting..." : "Connect & Donate"}
            </Button>
            
            <Button
              variant="outline"
              asChild
              className={`${
                isHeroVariant 
                  ? 'border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/10 hover:border-purple-400 backdrop-blur-sm bg-white/5 rounded-xl px-6 py-2' 
                  : 'border-purple-300 text-purple-600 hover:bg-purple-50 rounded-xl'
              }`}
            >
              <a 
                href="https://etherscan.io/address/0x86979D26A14e17CF2E719dcB369d559f3ad41057" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Wallet
              </a>
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className={`p-3 rounded-xl border ${
            isHeroVariant 
              ? 'bg-white/10 backdrop-blur-sm border-white/20' 
              : 'bg-green-50 border-green-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`text-sm font-medium ${isHeroVariant ? 'text-white' : 'text-green-700'}`}>
                Wallet Connected
              </span>
            </div>
            <div className={`text-xs font-mono ${isHeroVariant ? 'text-purple-100' : 'text-green-600'}`}>
              {connectedAddress}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                Network
              </label>
              <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                <SelectTrigger className={`${
                  isHeroVariant 
                    ? 'bg-white/10 backdrop-blur-sm border-white/20 text-white' 
                    : 'bg-white border-gray-200'
                } rounded-xl`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ethereum">Ethereum Network</SelectItem>
                  <SelectItem value="solana">Solana Network</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                Cryptocurrency
              </label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger className={`${
                  isHeroVariant 
                    ? 'bg-white/10 backdrop-blur-sm border-white/20 text-white' 
                    : 'bg-white border-gray-200'
                } rounded-xl`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptoOptions[selectedNetwork]?.map((crypto) => (
                    <SelectItem key={crypto.symbol} value={crypto.symbol}>
                      <div className="flex items-center gap-2">
                        <span>{crypto.icon}</span>
                        <span>{crypto.symbol} - {crypto.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                Amount
              </label>
              <Input
                type="number"
                step="0.001"
                min="0"
                placeholder="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${
                  isHeroVariant 
                    ? 'bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400' 
                    : 'bg-white border-gray-200'
                } rounded-xl`}
              />
            </div>

            <Button
              onClick={sendCrypto}
              disabled={isSending || !amount}
              className={`w-full ${
                isHeroVariant 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                  : 'bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90'
              } rounded-xl transition-all duration-300`}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSending ? "Sending..." : `Send ${selectedCrypto}`}
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setIsConnected(false);
                setConnectedAddress("");
                setAmount("");
              }}
              className={`w-full ${
                isHeroVariant 
                  ? 'border-2 border-white/20 text-purple-200 hover:bg-white/10 backdrop-blur-sm bg-white/5' 
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              } rounded-xl`}
            >
              Disconnect Wallet
            </Button>
          </div>
        </div>
      )}

      {isHeroVariant && !isConnected && (
        <p className="text-xs text-purple-300 mt-3 opacity-80">
          Your support helps me continue building amazing projects! 🚀
        </p>
      )}
    </div>
  );
};

export default WalletDonation;
