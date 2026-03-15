import { useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useResearchStore } from '../../stores/researchStore';
import { useRecipeStore } from '../../stores/recipeStore';
import { exportToZip } from '../../utils/exportZip';
import { validateAll } from '../../utils/validation';
import Modal from '../common/Modal';

export default function ExportDialog() {
  const open = useUIStore((s) => s.exportDialogOpen);
  const close = useUIStore((s) => s.closeExportDialog);
  const openValidation = useUIStore((s) => s.openValidationDialog);
  const nodes = useResearchStore((s) => s.nodes);
  const recipes = useRecipeStore((s) => s.recipes);
  const [includeAdvancements, setIncludeAdvancements] = useState(true);
  const [exporting, setExporting] = useState(false);

  const issues = validateAll(nodes, recipes);
  const errors = issues.filter((i) => i.severity === 'error');
  const nodeCount = Object.keys(nodes).length;
  const recipeCount = Object.keys(recipes).length;

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToZip(nodes, recipes, includeAdvancements);
      close();
    } finally {
      setExporting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} title="Export Datapack" width={450}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {nodeCount} research node{nodeCount !== 1 ? 's' : ''}, {recipeCount} recipe{recipeCount !== 1 ? 's' : ''}
        </div>

        {errors.length > 0 && (
          <div style={{
            padding: '8px 10px',
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            color: 'var(--error)',
          }}>
            {errors.length} validation error{errors.length !== 1 ? 's' : ''} found.{' '}
            <button
              className="btn-sm btn-secondary"
              onClick={() => { close(); openValidation(); }}
            >
              View
            </button>
          </div>
        )}

        <label style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="checkbox"
            checked={includeAdvancements}
            onChange={(e) => setIncludeAdvancements(e.target.checked)}
          />
          Include advancement files
        </label>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn-secondary btn-sm" onClick={close}>Cancel</button>
          <button
            className="btn-primary btn-sm"
            onClick={handleExport}
            disabled={exporting || nodeCount === 0}
          >
            {exporting ? 'Exporting...' : 'Download ZIP'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
