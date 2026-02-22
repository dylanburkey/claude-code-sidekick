import { usePrivy } from '@privy-io/react-auth';

interface NavbarProps {
  demoMode?: boolean;
  connected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function Navbar({ demoMode, connected, onConnect, onDisconnect }: NavbarProps) {
  // Use Privy hooks only when not in demo mode
  const privy = demoMode ? null : usePrivy();
  
  const isConnected = demoMode ? connected : privy?.authenticated;
  const walletAddress = demoMode ? '0x1234...abcd' : privy?.user?.wallet?.address;
  const login = demoMode ? onConnect : privy?.login;
  const logout = demoMode ? onDisconnect : privy?.logout;

  const displayAddress = walletAddress 
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : '';

  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <div className="navbar__logo">
          <div className="navbar__logo-icon">N</div>
          <span>
            <span className="text-gradient">NEXUS</span>
          </span>
        </div>

        {isConnected && (
          <div className="navbar__links">
            <a href="#" className="navbar__link active">Dashboard</a>
            <a href="#" className="navbar__link">Staking</a>
            <a href="#" className="navbar__link">Governance</a>
            <a href="#" className="navbar__link">Rewards</a>
          </div>
        )}

        <div className="flex gap-md">
          {isConnected ? (
            <>
              <div className="wallet-badge">{displayAddress}</div>
              <button className="btn btn--ghost" onClick={logout}>
                Disconnect
              </button>
            </>
          ) : (
            <button className="btn btn--glow" onClick={login}>
              🔗 Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
