import { useRef, useState } from 'react';
import { useUIStore } from '../../stores/uiStore';
import { useResearchStore } from '../../stores/researchStore';
import { useRecipeStore } from '../../stores/recipeStore';
import { importFiles } from '../../utils/importJson';
import Modal from '../common/Modal';

export default function ImportDialog() {
  const open = useUIStore((s) => s.importDialogOpen);
  const close = useUIStore((s) => s.closeImportDialog);
  const showConfirm = useUIStore((s) => s.showConfirm);
  const setNodes = useResearchStore((s) => s.setNodes);
  const existingNodes = useResearchStore((s) => s.nodes);
  const setRecipes = useRecipeStore((s) => s.setRecipes);
  const existingRecipes = useRecipeStore((s) => s.recipes);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async (merge: boolean) => {
    if (!fileInputRef.current?.files?.length) return;
    setImporting(true);
    setError(null);

    try {
      const { nodes, recipes } = await importFiles(fileInputRef.current.files);
      const nodeCount = Object.keys(nodes).length;
      const recipeCount = Object.keys(recipes).length;

      if (nodeCount === 0 && recipeCount === 0) {
        setError('No valid research or recipe files found.');
        return;
      }

      if (merge) {
        setNodes({ ...existingNodes, ...nodes });
        setRecipes({ ...existingRecipes, ...recipes });
      } else {
        setNodes(nodes);
        setRecipes(recipes);
      }
      close();
    } catch (err) {
      setError(`Import failed: ${(err as Error).message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Modal open={open} onClose={close} title="Import Files" width={450}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          Import JSON files or a ZIP containing research and recipe definitions.
        </div>

        <input
          type="file"
          ref={fileInputRef}
          accept=".json,.zip"
          multiple
          style={{ fontSize: 13 }}
        />

        {error && (
          <div style={{ fontSize: 12, color: 'var(--error)' }}>{error}</div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn-secondary btn-sm" onClick={close}>Cancel</button>
          <button
            className="btn-secondary btn-sm"
            onClick={() => handleImport(true)}
            disabled={importing}
          >
            Merge with existing
          </button>
          <button
            className="btn-primary btn-sm"
            onClick={() => {
              const hasExisting = Object.keys(existingNodes).length > 0 || Object.keys(existingRecipes).length > 0;
              if (hasExisting) {
                showConfirm(
                  'Replace All',
                  'This will replace all existing nodes and recipes. Continue?',
                  () => handleImport(false)
                );
              } else {
                handleImport(false);
              }
            }}
            disabled={importing}
          >
            {importing ? 'Importing...' : 'Replace all'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
