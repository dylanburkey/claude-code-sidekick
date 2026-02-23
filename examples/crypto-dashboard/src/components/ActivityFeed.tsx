const activities = [
  {
    type: 'stake',
    title: 'Staked 1,000 NEXUS',
    time: '2 hours ago',
    icon: '🔒',
  },
  {
    type: 'claim',
    title: 'Claimed 42.5 NEXUS rewards',
    time: '5 hours ago',
    icon: '🎁',
  },
  {
    type: 'swap',
    title: 'Swapped 0.5 ETH → 2,100 NEXUS',
    time: '1 day ago',
    icon: '🔄',
  },
  {
    type: 'vote',
    title: 'Voted on Proposal #47',
    time: '2 days ago',
    icon: '🗳️',
  },
  {
    type: 'stake',
    title: 'Staked 5,000 NEXUS',
    time: '3 days ago',
    icon: '🔒',
  },
];

export function ActivityFeed() {
  return (
    <div className="activity-feed">
      {activities.map((activity, index) => (
        <div key={index} className="activity-item">
          <div className="flex" style={{ alignItems: 'center' }}>
            <div className="activity-item__icon">{activity.icon}</div>
            <div className="activity-item__details">
              <div className="activity-item__title">{activity.title}</div>
              <div className="activity-item__time">{activity.time}</div>
            </div>
          </div>
          <span className="text-green">✓</span>
        </div>
      ))}
    </div>
  );
}
