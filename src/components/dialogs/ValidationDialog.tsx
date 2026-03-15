import { useMemo } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useResearchStore } from '../../stores/researchStore';
import { useRecipeStore } from '../../stores/recipeStore';
import { validateAll } from '../../utils/validation';
import Modal from '../common/Modal';

export default function ValidationDialog() {
  const open = useUIStore((s) => s.validationDialogOpen);
  const close = useUIStore((s) => s.closeValidationDialog);
  const selectNode = useUIStore((s) => s.selectNode);
  const selectRecipe = useUIStore((s) => s.selectRecipe);
  const nodes = useResearchStore((s) => s.nodes);
  const recipes = useRecipeStore((s) => s.recipes);

  const issues = useMemo(() => {
    if (!open) return [];
    return validateAll(nodes, recipes);
  }, [open, nodes, recipes]);

  const errors = issues.filter((i) => i.severity === 'error');
  const warnings = issues.filter((i) => i.severity === 'warning');

  const handleClick = (target: string, targetId: string) => {
    if (target === 'research') {
      selectNode(targetId);
    } else {
      selectRecipe(targetId);
    }
    close();
  };

  return (
    <Modal open={open} onClose={close} title="Validation Results" width={550}>
      {issues.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 20, color: 'var(--success)' }}>
          No issues found. Your datapack is valid!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            {errors.length} error{errors.length !== 1 ? 's' : ''}, {warnings.length} warning{warnings.length !== 1 ? 's' : ''}
          </div>

          {errors.map((issue, i) => (
            <div
              key={`err-${i}`}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                padding: '6px 8px',
                background: 'rgba(239, 68, 68, 0.08)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                cursor: 'pointer',
              }}
              onClick={() => handleClick(issue.target, issue.targetId)}
            >
              <span style={{ color: 'var(--error)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>ERR</span>
              <div style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 600 }}>{issue.targetId}</span>
                <span style={{ color: 'var(--text-muted)' }}>.{issue.field}</span>
                {' — '}
                {issue.message}
              </div>
            </div>
          ))}

          {warnings.map((issue, i) => (
            <div
              key={`warn-${i}`}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                padding: '6px 8px',
                background: 'rgba(245, 158, 11, 0.08)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(245, 158, 11, 0.2)',
                cursor: 'pointer',
              }}
              onClick={() => handleClick(issue.target, issue.targetId)}
            >
              <span style={{ color: 'var(--warning)', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>WARN</span>
              <div style={{ fontSize: 12 }}>
                <span style={{ fontWeight: 600 }}>{issue.targetId}</span>
                <span style={{ color: 'var(--text-muted)' }}>.{issue.field}</span>
                {' — '}
                {issue.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
