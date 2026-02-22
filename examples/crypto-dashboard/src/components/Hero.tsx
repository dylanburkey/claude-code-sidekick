import { usePrivy } from '@privy-io/react-auth';

interface HeroProps {
  demoMode?: boolean;
  onConnect?: () => void;
}

export function Hero({ demoMode, onConnect }: HeroProps) {
  const privy = demoMode ? null : usePrivy();
  const login = demoMode ? onConnect : privy?.login;

  return (
    <section className="hero">
      <div className="hero__glow" />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <span className="hero__tag">
          ⚡ Powered by Web3
        </span>
        
        <h1 className="hero__title">
          <span className="text-gradient">NEXUS</span>
          <br />
          PROTOCOL
        </h1>
        
        <p className="hero__subtitle">
          The Future of Decentralized Intelligence. Stake, earn, and govern 
          the next generation of AI-powered DeFi infrastructure.
        </p>

        <button className="btn btn--glow" onClick={login}>
          🔗 Connect Wallet
        </button>

        <div className="hero__stats">
          <div className="hero__stat">
            <div className="hero__stat-value text-gradient">$2.4B</div>
            <div className="hero__stat-label">Total Value Locked</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value text-gradient">847K</div>
            <div className="hero__stat-label">Token Holders</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value text-gradient">12.4%</div>
            <div className="hero__stat-label">Current APY</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value text-gradient">156</div>
            <div className="hero__stat-label">Integrations</div>
          </div>
        </div>
      </div>
    </section>
  );
}
