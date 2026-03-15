import type { IdeaChip } from '../../types/research';
import CopyButton from '../common/CopyButton';
import ItemAutocomplete from '../common/ItemAutocomplete';

interface Props {
  ideaChip: IdeaChip | null;
  nodeId: string;
  nodeName: string;
  onChange: (ideaChip: IdeaChip | null) => void;
}

export default function IdeaChipEditor({ ideaChip, nodeId, nodeName, onChange }: Props) {
  const enabled = ideaChip !== null;

  const toggle = () => {
    if (enabled) {
      onChange(null);
    } else {
      const displayName = nodeName || nodeId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      onChange({
        item: 'researchcube:metadata_broken',
        components: {
          'minecraft:custom_name': `{"text":"Idea: ${displayName}","italic":false}`,
          'minecraft:custom_data': { researchcube_chip_id: nodeId },
        },
      });
    }
  };

  const chipId = ideaChip?.components?.['minecraft:custom_data']?.researchcube_chip_id as string || nodeId;

  const giveCommand = ideaChip
    ? `/give @s ${ideaChip.item}[minecraft:custom_name='${ideaChip.components?.['minecraft:custom_name'] || ''}',minecraft:custom_data={researchcube_chip_id:"${chipId}"}]`
    : '';

  return (
    <div className="editor-section">
      <div className="editor-section-title">
        Idea Chip
        <span className="editor-badge" style={{ marginLeft: 6 }}>Phase 21 — coming soon</span>
      </div>

      <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="checkbox" checked={enabled} onChange={toggle} />
        Require idea chip
      </label>

      {enabled && ideaChip && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          <div className="editor-field">
            <label className="editor-field-label">Base Item</label>
            <ItemAutocomplete
              value={ideaChip.item}
              onChange={(item) => onChange({ ...ideaChip, item })}
            />
          </div>

          <div className="editor-field">
            <label className="editor-field-label">Custom Name (displayed to player)</label>
            <input
              type="text"
              value={ideaChip.components?.['minecraft:custom_name'] || ''}
              placeholder='{"text":"Idea: ...","italic":false}'
              onChange={(e) =>
                onChange({
                  ...ideaChip,
                  components: {
                    ...ideaChip.components,
                    'minecraft:custom_name': e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="editor-field">
            <label className="editor-field-label">Chip ID (researchcube_chip_id)</label>
            <input
              type="text"
              value={chipId}
              onChange={(e) =>
                onChange({
                  ...ideaChip,
                  components: {
                    ...ideaChip.components,
                    'minecraft:custom_data': { researchcube_chip_id: e.target.value },
                  },
                })
              }
            />
          </div>

          <div className="editor-field">
            <label className="editor-field-label">/give Command</label>
            <div style={{
              background: 'var(--bg-tertiary)',
              padding: '6px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              wordBreak: 'break-all',
            }}>
              {giveCommand}
            </div>
            <CopyButton text={giveCommand} label="Copy Command" />
          </div>
        </div>
      )}
    </div>
  );
}
