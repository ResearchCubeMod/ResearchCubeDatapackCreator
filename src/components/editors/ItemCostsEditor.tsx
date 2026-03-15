import type { ItemCost } from '../../types/common';
import ItemAutocomplete from '../common/ItemAutocomplete';

interface Props {
  items: ItemCost[];
  onChange: (items: ItemCost[]) => void;
}

export default function ItemCostsEditor({ items, onChange }: Props) {
  const addItem = () => {
    if (items.length >= 6) return;
    onChange([...items, { item: '', count: 1 }]);
  };

  const updateItem = (index: number, updates: Partial<ItemCost>) => {
    const next = items.map((item, i) => (i === index ? { ...item, ...updates } : item));
    onChange(next);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <div className="editor-section-title">
        Item Costs <span className="editor-field-hint">({items.length}/6)</span>
      </div>
      {items.map((item, i) => (
        <div key={i} className="editor-list-item">
          <div style={{ flex: 1 }}>
            <ItemAutocomplete
              value={item.item}
              onChange={(v) => updateItem(i, { item: v })}
            />
          </div>
          <input
            type="number"
            value={item.count}
            min={1}
            style={{ width: 56 }}
            onChange={(e) => updateItem(i, { count: Math.max(1, parseInt(e.target.value) || 1) })}
          />
          <button className="btn-icon" onClick={() => removeItem(i)}>&#x2715;</button>
        </div>
      ))}
      <button
        className="btn-secondary btn-sm"
        onClick={addItem}
        disabled={items.length >= 6}
      >
        + Add Item
      </button>
    </div>
  );
}
