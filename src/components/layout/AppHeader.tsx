import { useUIStore } from '../../stores/uiStore';
import { useResearchStore } from '../../stores/researchStore';
import { useRecipeStore } from '../../stores/recipeStore';
import { getExampleTree } from '../../data/exampleTree';
import './AppHeader.css';

export default function AppHeader() {
  const openImport = useUIStore((s) => s.openImportDialog);
  const openExport = useUIStore((s) => s.openExportDialog);
  const openValidation = useUIStore((s) => s.openValidationDialog);
  const showConfirm = useUIStore((s) => s.showConfirm);
  const clearResearch = useResearchStore((s) => s.clearAll);
  const setNodes = useResearchStore((s) => s.setNodes);
  const clearRecipes = useRecipeStore((s) => s.clearAll);

  const handleNew = () => {
    showConfirm(
      'New Project',
      'This will clear all research nodes and recipes. Continue?',
      () => {
        clearResearch();
        clearRecipes();
      }
    );
  };

  const handleLoadExample = () => {
    showConfirm(
      'Load Example Tree',
      'This will replace all current nodes with the 23-node example tree. Continue?',
      () => {
        clearRecipes();
        setNodes(getExampleTree());
      }
    );
  };

  return (
    <header className="app-header">
      <div className="app-header-brand">
        <span className="app-header-title">ResearchCube Datapack Creator</span>
      </div>
      <div className="app-header-actions">
        <button className="btn-secondary btn-sm" onClick={handleNew}>New</button>
        <button className="btn-secondary btn-sm" onClick={handleLoadExample}>Load Example</button>
        <button className="btn-secondary btn-sm" onClick={openImport}>Import</button>
        <button className="btn-secondary btn-sm" onClick={openValidation}>Validate</button>
        <button className="btn-primary btn-sm" onClick={openExport}>Export ZIP</button>
      </div>
    </header>
  );
}
