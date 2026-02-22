interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  changePercent: string;
  positive?: boolean;
}

export function StatsCard({ label, value, change, changePercent, positive }: StatsCardProps) {
  return (
    <div className="glass stat-card">
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{value}</div>
      <div className={`stat-card__change ${positive ? 'positive' : ''}`}>
        {positive && '▲'} {changePercent} {change && <span className="text-muted">{change}</span>}
      </div>
    </div>
  );
}
