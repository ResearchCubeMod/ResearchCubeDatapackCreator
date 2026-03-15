import { useResearchStore } from '../../stores/researchStore';
import { flattenPrerequisiteIds, getPrerequisiteMode } from '../../utils/prerequisites';
import { stripNamespace } from '../../utils/idHelpers';

interface Props {
  nodeId: string;
}

export default function PrerequisiteEditor({ nodeId }: Props) {
  const node = useResearchStore((s) => s.nodes[nodeId]);
  const setMode = useResearchStore((s) => s.setPrerequisiteMode);

  if (!node) return null;

  const prereqIds = node.prerequisites
    ? flattenPrerequisiteIds(node.prerequisites).map(stripNamespace)
    : [];
  const mode = getPrerequisiteMode(node.prerequisites);

  return (
    <div className="editor-section">
      <div className="editor-section-title">Prerequisites</div>
      {prereqIds.length === 0 ? (
        <span className="editor-field-hint">
          No prerequisites. Connect nodes on the canvas to add.
        </span>
      ) : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {prereqIds.map((id) => (
              <span key={id} className="editor-badge">{id}</span>
            ))}
          </div>
          {prereqIds.length >= 2 && (
            <div className="editor-field-row" style={{ marginTop: 4 }}>
              <span className="editor-field-label" style={{ marginRight: 8 }}>Mode:</span>
              <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 3 }}>
                <input
                  type="radio"
                  name={`prereq-mode-${nodeId}`}
                  checked={mode === 'AND' || mode === null}
                  onChange={() => setMode(nodeId, 'AND')}
                />
                AND (all required)
              </label>
              <label style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 3, marginLeft: 8 }}>
                <input
                  type="radio"
                  name={`prereq-mode-${nodeId}`}
                  checked={mode === 'OR'}
                  onChange={() => setMode(nodeId, 'OR')}
                />
                OR (any one)
              </label>
            </div>
          )}
        </>
      )}
    </div>
  );
}
