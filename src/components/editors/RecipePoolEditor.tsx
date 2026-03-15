import { useCallback } from 'react';
import type { WeightedRecipe } from '../../types/research';
import { useRecipeStore } from '../../stores/recipeStore';
import { useUIStore } from '../../stores/uiStore';
import { createDefaultShapelessRecipe } from '../../types/recipe';
import { generateUniqueId } from '../../utils/idHelpers';

interface Props {
  recipePool: WeightedRecipe[];
  onChange: (pool: WeightedRecipe[]) => void;
}

export default function RecipePoolEditor({ recipePool, onChange }: Props) {
  const recipes = useRecipeStore((s) => s.recipes);
  const addRecipe = useRecipeStore((s) => s.addRecipe);
  const selectRecipe = useUIStore((s) => s.selectRecipe);

  const addExistingRef = () => {
    onChange([...recipePool, '']);
  };

  const createAndAdd = useCallback(() => {
    const existingIds = new Set(Object.keys(recipes));
    const id = generateUniqueId('new_recipe', existingIds);
    const recipe = createDefaultShapelessRecipe(id);
    addRecipe(recipe);
    onChange([...recipePool, `researchcube:${id}`]);
    selectRecipe(id);
  }, [recipes, addRecipe, recipePool, onChange, selectRecipe]);

  const updateEntry = (index: number, value: WeightedRecipe) => {
    const next = recipePool.map((entry, i) => (i === index ? value : entry));
    onChange(next);
  };

  const removeEntry = (index: number) => {
    onChange(recipePool.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-section">
      <div className="editor-section-title">Recipe Pool</div>
      {recipePool.length === 0 && (
        <span className="editor-field-hint">No recipes linked to this research node.</span>
      )}
      {recipePool.map((entry, i) => {
        const id = typeof entry === 'string' ? entry : entry.id;
        const weight = typeof entry === 'object' ? entry.weight : 1;
        const cleanId = id.replace('researchcube:', '');
        const exists = recipes[cleanId];

        return (
          <div key={i} className="editor-list-item">
            <input
              type="text"
              value={id}
              placeholder="researchcube:recipe_name"
              style={{ flex: 1 }}
              onChange={(e) => {
                const newId = e.target.value;
                if (weight !== 1) {
                  updateEntry(i, { id: newId, weight });
                } else {
                  updateEntry(i, newId);
                }
              }}
            />
            <input
              type="number"
              value={weight}
              min={1}
              style={{ width: 48 }}
              title="Weight"
              onChange={(e) => {
                const w = Math.max(1, parseInt(e.target.value) || 1);
                updateEntry(i, w === 1 ? id : { id, weight: w });
              }}
            />
            {exists && (
              <button
                className="btn-sm btn-secondary"
                onClick={() => selectRecipe(cleanId)}
                title="Edit recipe"
              >
                Edit
              </button>
            )}
            <button className="btn-icon" onClick={() => removeEntry(i)}>&#x2715;</button>
          </div>
        );
      })}
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn-secondary btn-sm" onClick={addExistingRef}>
          + Add Reference
        </button>
        <button className="btn-primary btn-sm" onClick={createAndAdd}>
          + Create Recipe
        </button>
      </div>
    </div>
  );
}
