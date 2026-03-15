import { useResearchStore } from '../../stores/researchStore';
import { useUIStore } from '../../stores/uiStore';
import BasicInfoSection from './BasicInfoSection';
import DurationInput from './DurationInput';
import ItemCostsEditor from './ItemCostsEditor';
import FluidCostEditor from './FluidCostEditor';
import PrerequisiteEditor from './PrerequisiteEditor';
import IdeaChipEditor from './IdeaChipEditor';
import RecipePoolEditor from './RecipePoolEditor';
import './EditorPanel.css';

interface Props {
  nodeId: string;
}

export default function ResearchEditorPanel({ nodeId }: Props) {
  const node = useResearchStore((s) => s.nodes[nodeId]);
  const updateNode = useResearchStore((s) => s.updateNode);
  const removeNode = useResearchStore((s) => s.removeNode);
  const selectNode = useUIStore((s) => s.selectNode);
  const showConfirm = useUIStore((s) => s.showConfirm);

  if (!node) return null;

  const handleDelete = () => {
    showConfirm('Delete Research', `Delete "${node.name || node.id}"? This cannot be undone.`, () => {
      removeNode(nodeId);
      selectNode(null);
    });
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-header">
        <h3 className="editor-panel-title">Research Node</h3>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          <button className="btn-icon" onClick={() => selectNode(null)}>&#x2715;</button>
        </div>
      </div>

      <div className="editor-panel-body">
        <BasicInfoSection node={node} onChange={(updates) => updateNode(nodeId, updates)} />
        <DurationInput
          value={node.duration}
          onChange={(duration) => updateNode(nodeId, { duration })}
        />
        <ItemCostsEditor
          items={node.itemCosts}
          onChange={(itemCosts) => updateNode(nodeId, { itemCosts })}
        />
        <FluidCostEditor
          fluidCost={node.fluidCost}
          tier={node.tier}
          onChange={(fluidCost) => updateNode(nodeId, { fluidCost })}
        />
        <PrerequisiteEditor nodeId={nodeId} />
        <IdeaChipEditor
          ideaChip={node.ideaChip}
          nodeId={node.id}
          nodeName={node.name}
          onChange={(ideaChip) => updateNode(nodeId, { ideaChip })}
        />
        <RecipePoolEditor
          recipePool={node.recipePool}
          onChange={(recipePool) => updateNode(nodeId, { recipePool })}
        />
      </div>
    </div>
  );
}
