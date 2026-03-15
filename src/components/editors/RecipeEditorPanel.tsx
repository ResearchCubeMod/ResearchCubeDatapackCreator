import { useRecipeStore } from '../../stores/recipeStore';
import { useUIStore } from '../../stores/uiStore';
import type { RecipeData, DriveCraftingShapelessRecipe, DriveCraftingShapedRecipe, ProcessingRecipe } from '../../types/recipe';
import DriveCraftingShapeless from './DriveCraftingShapeless';
import DriveCraftingShaped from './DriveCraftingShaped';
import ProcessingEditor from './ProcessingEditor';
import RecipeResultEditor from './RecipeResultEditor';
import './EditorPanel.css';

interface Props {
  recipeId: string;
}

export default function RecipeEditorPanel({ recipeId }: Props) {
  const recipe = useRecipeStore((s) => s.recipes[recipeId]);
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);
  const selectRecipe = useUIStore((s) => s.selectRecipe);
  const showConfirm = useUIStore((s) => s.showConfirm);

  if (!recipe) return null;

  const handleDelete = () => {
    showConfirm('Delete Recipe', `Delete recipe "${recipe.id}"? This cannot be undone.`, () => {
      removeRecipe(recipeId);
      selectRecipe(null);
    });
  };

  const switchKind = (newKind: RecipeData['kind']) => {
    if (recipe.kind === newKind) return;
    let newRecipe: RecipeData;
    if (newKind === 'drive_crafting_shapeless') {
      newRecipe = {
        kind: 'drive_crafting_shapeless',
        id: recipe.id,
        ingredients: [{ item: 'minecraft:stone' }],
        result: 'result' in recipe ? recipe.result : { id: 'minecraft:stone', count: 1 },
        group: recipe.group,
      };
    } else if (newKind === 'drive_crafting_shaped') {
      newRecipe = {
        kind: 'drive_crafting_shaped',
        id: recipe.id,
        pattern: ['   ', '   ', '   '],
        key: {},
        result: 'result' in recipe ? recipe.result : { id: 'minecraft:stone', count: 1 },
        group: recipe.group,
      };
    } else {
      newRecipe = {
        kind: 'processing',
        id: recipe.id,
        inputs: [{ item: 'minecraft:stone' }],
        fluidInputs: [],
        outputs: [{ id: 'minecraft:stone', count: 1 }],
        fluidOutput: null,
        duration: 200,
        group: recipe.group,
      };
    }
    updateRecipe(recipeId, newRecipe);
  };

  return (
    <div className="editor-panel">
      <div className="editor-panel-header">
        <h3 className="editor-panel-title">Recipe Editor</h3>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="btn-danger btn-sm" onClick={handleDelete}>Delete</button>
          <button className="btn-icon" onClick={() => selectRecipe(null)}>&#x2715;</button>
        </div>
      </div>

      <div className="editor-panel-body">
        <div className="editor-section">
          <div className="editor-section-title">Recipe Info</div>
          <div className="editor-field">
            <label className="editor-field-label">Recipe ID</label>
            <input type="text" value={recipe.id} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
            <span className="editor-field-hint">researchcube:{recipe.id}</span>
          </div>
        </div>

        <div className="editor-section">
          <div className="editor-section-title">Recipe Type</div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button
              className={`btn-sm ${recipe.kind === 'drive_crafting_shapeless' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => switchKind('drive_crafting_shapeless')}
            >
              Shapeless
            </button>
            <button
              className={`btn-sm ${recipe.kind === 'drive_crafting_shaped' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => switchKind('drive_crafting_shaped')}
            >
              Shaped
            </button>
            <button
              className={`btn-sm ${recipe.kind === 'processing' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => switchKind('processing')}
            >
              Processing
            </button>
          </div>
        </div>

        {recipe.kind === 'drive_crafting_shapeless' && (
          <DriveCraftingShapeless
            recipe={recipe as DriveCraftingShapelessRecipe}
            onChange={(r) => updateRecipe(recipeId, r)}
          />
        )}

        {recipe.kind === 'drive_crafting_shaped' && (
          <DriveCraftingShaped
            recipe={recipe as DriveCraftingShapedRecipe}
            onChange={(r) => updateRecipe(recipeId, r)}
          />
        )}

        {recipe.kind === 'processing' && (
          <ProcessingEditor
            recipe={recipe as ProcessingRecipe}
            onChange={(r) => updateRecipe(recipeId, r)}
          />
        )}

        {recipe.kind !== 'processing' && (
          <RecipeResultEditor
            result={(recipe as DriveCraftingShapelessRecipe).result}
            onChange={(result) => updateRecipe(recipeId, { ...recipe, result } as RecipeData)}
          />
        )}
      </div>
    </div>
  );
}
