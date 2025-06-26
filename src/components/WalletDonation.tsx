
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Coffee, Copy, ExternalLink, Send, RefreshCw } from "lucide-react";

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

interface TokenBalance {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  decimals: number;
  contractAddress?: string;
  isNative: boolean;
}

interface NetworkInfo {
  chainId: string;
  name: string;
  currency: string;
  icon: string;
}

const WalletDonation = ({ variant = 'contact', className = "" }: WalletDonationProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState<NetworkInfo | null>(null);
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<TokenBalance | null>(null);
  const [availableTokens, setAvailableTokens] = useState<TokenBalance[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);

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

  const networkConfigs: Record<string, NetworkInfo> = {
    "0x1": { chainId: "0x1", name: "Ethereum", currency: "ETH", icon: "⚡" },
    "0x38": { chainId: "0x38", name: "BSC", currency: "BNB", icon: "🟡" },
    "0x89": { chainId: "0x89", name: "Polygon", currency: "MATIC", icon: "🟣" },
    "0xa": { chainId: "0xa", name: "Optimism", currency: "ETH", icon: "🔴" },
    "0xa4b1": { chainId: "0xa4b1", name: "Arbitrum", currency: "ETH", icon: "🔵" }
  };

  const commonTokens: Record<string, any[]> = {
    "0x1": [ // Ethereum
      { symbol: "USDT", name: "Tether USD", contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6 },
      { symbol: "USDC", name: "USD Coin", contractAddress: "0xA0b86a33E6441a0b48b6a68d3e1F6e5CC6abCB2d", decimals: 6 },
      { symbol: "DAI", name: "Dai Stablecoin", contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
      { symbol: "WETH", name: "Wrapped Ether", contractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18 }
    ],
    "0x38": [ // BSC
      { symbol: "USDT", name: "Tether USD", contractAddress: "0x55d398326f99059fF775485246999027B3197955", decimals: 18 },
      { symbol: "USDC", name: "USD Coin", contractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", decimals: 18 },
      { symbol: "BUSD", name: "Binance USD", contractAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", decimals: 18 }
    ],
    "0x89": [ // Polygon
      { symbol: "USDT", name: "Tether USD", contractAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F", decimals: 6 },
      { symbol: "USDC", name: "USD Coin", contractAddress: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 },
      { symbol: "DAI", name: "Dai Stablecoin", contractAddress: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", decimals: 18 }
    ]
  };

  const detectNetwork = async () => {
    if (!window.ethereum) return null;
    
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      console.log('Detected chain ID:', chainId);
      return networkConfigs[chainId] || null;
    } catch (error) {
      console.error('Error detecting network:', error);
      return null;
    }
  };

  const getTokenBalance = async (contractAddress: string, userAddress: string, decimals: number) => {
    try {
      const data = `0x70a08231000000000000000000000000${userAddress.slice(2)}`;
      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: contractAddress,
          data: data
        }, 'latest']
      });
      
      const balance = parseInt(result, 16) / Math.pow(10, decimals);
      return balance.toString();
    } catch (error) {
      console.error('Error getting token balance:', error);
      return "0";
    }
  };

  const getNativeBalance = async (userAddress: string) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [userAddress, 'latest']
      });
      
      const balanceInEth = parseInt(balance, 16) / Math.pow(10, 18);
      return balanceInEth.toString();
    } catch (error) {
      console.error('Error getting native balance:', error);
      return "0";
    }
  };

  const loadAvailableTokens = async () => {
    if (!isConnected || !connectedAddress || !currentNetwork) return;
    
    setIsLoadingTokens(true);
    const tokens: TokenBalance[] = [];
    
    try {
      // Add native token
      const nativeBalance = await getNativeBalance(connectedAddress);
      if (parseFloat(nativeBalance) > 0) {
        tokens.push({
          symbol: currentNetwork.currency,
          name: currentNetwork.name,
          icon: currentNetwork.icon,
          balance: parseFloat(nativeBalance).toFixed(6),
          decimals: 18,
          isNative: true
        });
      }

      // Add ERC-20 tokens
      const chainTokens = commonTokens[currentNetwork.chainId] || [];
      for (const token of chainTokens) {
        const balance = await getTokenBalance(token.contractAddress, connectedAddress, token.decimals);
        if (parseFloat(balance) > 0) {
          tokens.push({
            symbol: token.symbol,
            name: token.name,
            icon: "💰",
            balance: parseFloat(balance).toFixed(6),
            decimals: token.decimals,
            contractAddress: token.contractAddress,
            isNative: false
          });
        }
      }

      setAvailableTokens(tokens);
      if (tokens.length > 0 && !selectedToken) {
        setSelectedToken(tokens[0]);
      }
    } catch (error) {
      console.error('Error loading tokens:', error);
      toast({
        title: "Error loading tokens",
        description: "Failed to fetch token balances",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTokens(false);
    }
  };

  useEffect(() => {
    if (isConnected && connectedAddress && currentNetwork) {
      loadAvailableTokens();
    }
  }, [isConnected, connectedAddress, currentNetwork]);

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
        const network = await detectNetwork();
        
        setConnectedAddress(accounts[0]);
        setCurrentNetwork(network);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected!",
          description: `Connected to ${network?.name || 'Unknown Network'}`,
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

    if (!selectedToken) {
      toast({
        title: "No token selected",
        description: "Please select a token to send",
        variant: "destructive",
      });
      return;
    }

    if (parseFloat(amount) > parseFloat(selectedToken.balance)) {
      toast({
        title: "Insufficient balance",
        description: `You only have ${selectedToken.balance} ${selectedToken.symbol}`,
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    try {
      const toAddress = walletAddresses.find(w => 
        w.network.toLowerCase().includes("evm") || 
        w.network.toLowerCase().includes("ethereum")
      )?.address;
      
      if (!toAddress) {
        throw new Error("Recipient address not found");
      }

      const amountInWei = (parseFloat(amount) * Math.pow(10, selectedToken.decimals)).toString(16);

      if (selectedToken.isNative) {
        // Native token transfer
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAddress,
            to: toAddress,
            value: `0x${amountInWei}`,
          }],
        });
      } else {
        // ERC-20 token transfer
        const data = `0xa9059cbb000000000000000000000000${toAddress.slice(2)}${amountInWei.padStart(64, '0')}`;
        
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAddress,
            to: selectedToken.contractAddress,
            data: data,
          }],
        });
      }

      toast({
        title: "Transaction Sent!",
        description: `${amount} ${selectedToken.symbol} has been sent successfully!`,
      });
      
      setAmount("");
      // Refresh token balances
      setTimeout(() => loadAvailableTokens(), 2000);
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
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className={`text-sm font-medium ${isHeroVariant ? 'text-white' : 'text-green-700'}`}>
                  Connected to {currentNetwork?.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={loadAvailableTokens}
                disabled={isLoadingTokens}
                className={`${isHeroVariant ? 'text-purple-200 hover:text-white hover:bg-white/10' : ''}`}
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingTokens ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className={`text-xs font-mono ${isHeroVariant ? 'text-purple-100' : 'text-green-600'}`}>
              {connectedAddress}
            </div>
          </div>

          {isLoadingTokens ? (
            <div className={`p-4 text-center ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
              <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2" />
              <p className="text-sm">Loading your tokens...</p>
            </div>
          ) : availableTokens.length === 0 ? (
            <div className={`p-4 text-center ${isHeroVariant ? 'text-purple-200' : 'text-muted-foreground'}`}>
              <p className="text-sm">No tokens found in your wallet</p>
            </div>
          ) : (
            <>
              <div>
                <label className={`block text-sm font-medium mb-1 ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                  Select Token
                </label>
                <Select 
                  value={selectedToken?.symbol || ""} 
                  onValueChange={(value) => {
                    const token = availableTokens.find(t => t.symbol === value);
                    setSelectedToken(token || null);
                  }}
                >
                  <SelectTrigger className={`${
                    isHeroVariant 
                      ? 'bg-white/10 backdrop-blur-sm border-white/20 text-white' 
                      : 'bg-white border-gray-200'
                  } rounded-xl`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTokens.map((token) => (
                      <SelectItem key={`${token.symbol}-${token.contractAddress || 'native'}`} value={token.symbol}>
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            <span>{token.icon}</span>
                            <span>{token.symbol}</span>
                          </div>
                          <span className="text-xs text-muted-foreground ml-4">
                            {token.balance}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedToken && (
                  <p className={`text-xs mt-1 ${isHeroVariant ? 'text-purple-200' : 'text-muted-foreground'}`}>
                    Available: {selectedToken.balance} {selectedToken.symbol}
                  </p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isHeroVariant ? 'text-white' : 'text-foreground'}`}>
                  Amount
                </label>
                <Input
                  type="number"
                  step="0.000001"
                  min="0"
                  max={selectedToken?.balance || "0"}
                  placeholder="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`${
                    isHeroVariant 
                      ? 'bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400' 
                      : 'bg-white border-gray-200'
                  } rounded-xl`}
                />
                {selectedToken && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount((parseFloat(selectedToken.balance) * 0.25).toFixed(6))}
                      className={`text-xs ${isHeroVariant ? 'border-white/20 text-purple-200 hover:bg-white/10' : ''}`}
                    >
                      25%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount((parseFloat(selectedToken.balance) * 0.5).toFixed(6))}
                      className={`text-xs ${isHeroVariant ? 'border-white/20 text-purple-200 hover:bg-white/10' : ''}`}
                    >
                      50%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount((parseFloat(selectedToken.balance) * 0.75).toFixed(6))}
                      className={`text-xs ${isHeroVariant ? 'border-white/20 text-purple-200 hover:bg-white/10' : ''}`}
                    >
                      75%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAmount(selectedToken.balance)}
                      className={`text-xs ${isHeroVariant ? 'border-white/20 text-purple-200 hover:bg-white/10' : ''}`}
                    >
                      Max
                    </Button>
                  </div>
                )}
              </div>

              <Button
                onClick={sendCrypto}
                disabled={isSending || !amount || !selectedToken}
                className={`w-full ${
                  isHeroVariant 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white' 
                    : 'bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90'
                } rounded-xl transition-all duration-300`}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? "Sending..." : `Send ${selectedToken?.symbol || 'Token'}`}
              </Button>
            </>
          )}

          <Button
            variant="outline"
            onClick={() => {
              setIsConnected(false);
              setConnectedAddress("");
              setCurrentNetwork(null);
              setAvailableTokens([]);
              setSelectedToken(null);
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
