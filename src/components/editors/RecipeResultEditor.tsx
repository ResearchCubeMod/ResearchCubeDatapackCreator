import type { ItemStack } from '../../types/common';
import ItemAutocomplete from '../common/ItemAutocomplete';

interface Props {
  result: ItemStack;
  onChange: (result: ItemStack) => void;
}

export default function RecipeResultEditor({ result, onChange }: Props) {
  return (
    <div className="editor-section">
      <div className="editor-section-title">Result</div>
      <div className="editor-list-item">
        <div style={{ flex: 1 }}>
          <ItemAutocomplete
            value={result.id}
            onChange={(id) => onChange({ ...result, id })}
          />
        </div>
        <input
          type="number"
          value={result.count}
          min={1}
          style={{ width: 56 }}
          onChange={(e) => onChange({ ...result, count: Math.max(1, parseInt(e.target.value) || 1) })}
        />
      </div>
    </div>
  );
}
