import { useUIStore } from '../../stores/uiStore';
import ResearchTreeCanvas from '../canvas/ResearchTreeCanvas';
import ResearchEditorPanel from '../editors/ResearchEditorPanel';
import RecipeEditorPanel from '../editors/RecipeEditorPanel';
import ValidationDialog from '../dialogs/ValidationDialog';
import ImportDialog from '../dialogs/ImportDialog';
import ExportDialog from '../dialogs/ExportDialog';
import ConfirmDialog from '../common/ConfirmDialog';
import './MainLayout.css';

export default function MainLayout() {
  const editorPanel = useUIStore((s) => s.editorPanel);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);
  const selectedRecipeId = useUIStore((s) => s.selectedRecipeId);

  return (
    <div className="main-layout">
      <div className="main-layout-canvas">
        <ResearchTreeCanvas />
      </div>
      {editorPanel === 'research' && selectedNodeId && (
        <div className="main-layout-panel">
          <ResearchEditorPanel nodeId={selectedNodeId} />
        </div>
      )}
      {editorPanel === 'recipe' && selectedRecipeId && (
        <div className="main-layout-panel">
          <RecipeEditorPanel recipeId={selectedRecipeId} />
        </div>
      )}

      <ValidationDialog />
      <ImportDialog />
      <ExportDialog />
      <ConfirmDialog />
    </div>
  );
}
