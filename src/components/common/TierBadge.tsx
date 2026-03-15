import type { Tier } from '../../types/research';
import { TIER_INFO } from '../../data/tiers';

interface TierBadgeProps {
  tier: Tier;
  small?: boolean;
}

export default function TierBadge({ tier, small }: TierBadgeProps) {
  const info = TIER_INFO[tier];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: small ? '1px 6px' : '2px 8px',
        borderRadius: 'var(--radius-sm)',
        fontSize: small ? 10 : 11,
        fontWeight: 600,
        letterSpacing: '0.5px',
        color: '#fff',
        background: info.color,
      }}
    >
      {tier}
    </span>
  );
}
