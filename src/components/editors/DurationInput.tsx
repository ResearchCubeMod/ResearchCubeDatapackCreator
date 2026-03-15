import { formatTicks } from '../../utils/tickFormatter';

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const QUICK_VALUES = [600, 1200, 2400, 4800, 9600, 18000];

export default function DurationInput({ value, onChange }: Props) {
  return (
    <div className="editor-section">
      <div className="editor-section-title">Duration</div>
      <div className="editor-field">
        <input
          type="number"
          value={value}
          min={1}
          onChange={(e) => onChange(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <span className="editor-field-hint">{formatTicks(value)}</span>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {QUICK_VALUES.map((v) => (
          <button
            key={v}
            className={`btn-sm ${v === value ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => onChange(v)}
          >
            {v / 20}s
          </button>
        ))}
      </div>
    </div>
  );
}
