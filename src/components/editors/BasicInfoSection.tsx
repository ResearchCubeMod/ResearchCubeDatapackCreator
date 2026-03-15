import type { ResearchNodeData, Tier } from '../../types/research';
import { TIERS } from '../../types/research';
import { CATEGORY_PRESETS } from '../../data/categories';

interface Props {
  node: ResearchNodeData;
  onChange: (updates: Partial<ResearchNodeData>) => void;
}

export default function BasicInfoSection({ node, onChange }: Props) {
  return (
    <div className="editor-section">
      <div className="editor-section-title">Basic Info</div>

      <div className="editor-field">
        <label className="editor-field-label">ID (filename)</label>
        <input
          type="text"
          value={node.id}
          disabled
          style={{ opacity: 0.6, cursor: 'not-allowed' }}
        />
        <span className="editor-field-hint">researchcube:{node.id}</span>
      </div>

      <div className="editor-field">
        <label className="editor-field-label">Display Name</label>
        <input
          type="text"
          value={node.name}
          placeholder={node.id}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>

      <div className="editor-field">
        <label className="editor-field-label">Description</label>
        <textarea
          value={node.description}
          placeholder="Short flavour text..."
          rows={2}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>

      <div className="editor-field">
        <label className="editor-field-label">Category</label>
        <input
          type="text"
          value={node.category}
          placeholder="e.g. circuits"
          list="category-presets"
          onChange={(e) => onChange({ category: e.target.value })}
        />
        <datalist id="category-presets">
          {CATEGORY_PRESETS.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </div>

      <div className="editor-field">
        <label className="editor-field-label">Tier</label>
        <select
          value={node.tier}
          onChange={(e) => onChange({ tier: e.target.value as Tier })}
        >
          {TIERS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
