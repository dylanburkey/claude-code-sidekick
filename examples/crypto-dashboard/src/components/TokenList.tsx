const tokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '12.4521', value: '$31,284.42', icon: 'Ξ' },
  { symbol: 'NEXUS', name: 'Nexus Token', balance: '84,320.00', value: '$42,160.00', icon: 'N' },
  { symbol: 'USDC', name: 'USD Coin', balance: '25,000.00', value: '$25,000.00', icon: '$' },
  { symbol: 'stETH', name: 'Lido Staked ETH', balance: '8.2134', value: '$20,664.12', icon: 'L' },
  { symbol: 'ARB', name: 'Arbitrum', balance: '4,521.00', value: '$5,738.78', icon: 'A' },
];

export function TokenList() {
  return (
    <div className="token-list">
      {tokens.map((token) => (
        <div key={token.symbol} className="token-item">
          <div className="token-item__info">
            <div className="token-item__icon">{token.icon}</div>
            <div>
              <div className="token-item__name">{token.name}</div>
              <div className="token-item__symbol">{token.symbol}</div>
            </div>
          </div>
          <div className="token-item__balance">
            <div className="token-item__amount">{token.balance}</div>
            <div className="token-item__value">{token.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
