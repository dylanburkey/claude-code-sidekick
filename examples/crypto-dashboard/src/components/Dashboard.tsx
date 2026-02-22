import { StatsCard } from './StatsCard';
import { TokenList } from './TokenList';
import { ActivityFeed } from './ActivityFeed';

export function Dashboard() {
  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Welcome back</h1>
          <p className="dashboard__subtitle">Here's your portfolio overview</p>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <StatsCard
            label="Portfolio Value"
            value="$124,847.32"
            change="+$12,432.18"
            changePercent="+11.2%"
            positive
          />
          <StatsCard
            label="24h Change"
            value="+$2,847.12"
            change=""
            changePercent="+2.3%"
            positive
          />
          <StatsCard
            label="Total Yield Earned"
            value="$8,432.12"
            change="This month"
            changePercent="+847.32"
            positive
          />
          <StatsCard
            label="Staking Rewards"
            value="12,450 NEXUS"
            change="≈ $6,225.00"
            changePercent=""
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
          {/* Holdings */}
          <div className="glass">
            <h3 className="mb-lg">📊 Holdings</h3>
            <TokenList />
          </div>

          {/* Chart Placeholder */}
          <div className="glass">
            <h3 className="mb-lg">📈 Performance (30d)</h3>
            <div 
              className="flex-center" 
              style={{ 
                height: '280px', 
                background: 'var(--color-bg)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text-muted)'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-sm)' }}>📊</div>
                <div>Chart visualization would go here</div>
                <div className="text-muted mt-sm" style={{ fontSize: '0.875rem' }}>
                  (Integrate with charting library)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="glass">
          <h3 className="mb-lg">🔔 Recent Activity</h3>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
