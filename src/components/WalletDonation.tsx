
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet, Coffee, Copy, ExternalLink } from "lucide-react";

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

const WalletDonation = ({ variant = 'contact', className = "" }: WalletDonationProps) => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);

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
      // Check if MetaMask is available
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
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

      <div className="space-y-3">
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

      <div className={`flex ${isHeroVariant ? 'flex-col sm:flex-row justify-center' : 'flex-row'} gap-3 mt-4`}>
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

      {isHeroVariant && (
        <p className="text-xs text-purple-300 mt-3 opacity-80">
          Your support helps me continue building amazing projects! 🚀
        </p>
      )}
    </div>
  );
};

export default WalletDonation;
