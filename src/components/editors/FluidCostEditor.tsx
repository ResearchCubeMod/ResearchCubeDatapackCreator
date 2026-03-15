import type { FluidCost } from '../../types/common';
import type { Tier } from '../../types/research';
import { TIER_FLUIDS } from '../../data/tiers';
import FluidAutocomplete from '../common/FluidAutocomplete';

interface Props {
  fluidCost: FluidCost | null;
  tier: Tier;
  onChange: (fluidCost: FluidCost | null) => void;
}

export default function FluidCostEditor({ fluidCost, tier, onChange }: Props) {
  const expectedFluid = TIER_FLUIDS[tier];
  const mismatch = fluidCost && fluidCost.fluid !== expectedFluid;

  const toggle = () => {
    if (fluidCost) {
      onChange(null);
    } else {
      onChange({ fluid: expectedFluid, amount: 1000 });
    }
  };

  return (
    <div className="editor-section">
      <div className="editor-section-title">
        Fluid Cost
        {mismatch && (
          <span className="editor-badge editor-badge-warning" style={{ marginLeft: 6 }}>
            Tier mismatch
          </span>
        )}
      </div>
      {!fluidCost ? (
        <button className="btn-secondary btn-sm" onClick={toggle}>
          + Add Fluid Cost
        </button>
      ) : (
        <>
          <div className="editor-list-item">
            <div style={{ flex: 1 }}>
              <FluidAutocomplete
                value={fluidCost.fluid}
                onChange={(fluid) => onChange({ ...fluidCost, fluid })}
              />
            </div>
            <input
              type="number"
              value={fluidCost.amount}
              min={1}
              style={{ width: 80 }}
              onChange={(e) =>
                onChange({ ...fluidCost, amount: Math.max(1, parseInt(e.target.value) || 1) })
              }
            />
            <span className="editor-field-hint">mB</span>
            <button className="btn-icon" onClick={toggle}>&#x2715;</button>
          </div>
          {mismatch && (
            <div className="editor-field-warning">
              Expected {expectedFluid} for tier {tier}.{' '}
              <button
                className="btn-sm btn-secondary"
                onClick={() => onChange({ ...fluidCost, fluid: expectedFluid })}
              >
                Fix
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
