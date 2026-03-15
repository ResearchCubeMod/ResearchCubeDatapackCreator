import type { DriveCraftingShapelessRecipe } from '../../types/recipe';
import ItemAutocomplete from '../common/ItemAutocomplete';

interface Props {
  recipe: DriveCraftingShapelessRecipe;
  onChange: (recipe: DriveCraftingShapelessRecipe) => void;
}

export default function DriveCraftingShapeless({ recipe, onChange }: Props) {
  const addIngredient = () => {
    if (recipe.ingredients.length >= 8) return;
    onChange({
      ...recipe,
      ingredients: [...recipe.ingredients, { item: '' }],
    });
  };

  const updateIngredient = (index: number, item: string) => {
    const next = recipe.ingredients.map((ing, i) =>
      i === index ? { item } : ing
    );
    onChange({ ...recipe, ingredients: next });
  };

  const removeIngredient = (index: number) => {
    onChange({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="editor-section">
      <div className="editor-section-title">
        Ingredients (Shapeless) <span className="editor-field-hint">({recipe.ingredients.length}/8)</span>
      </div>
      {recipe.ingredients.map((ing, i) => (
        <div key={i} className="editor-list-item">
          <div style={{ flex: 1 }}>
            <ItemAutocomplete
              value={ing.item}
              onChange={(v) => updateIngredient(i, v)}
            />
          </div>
          <button className="btn-icon" onClick={() => removeIngredient(i)}>&#x2715;</button>
        </div>
      ))}
      <button
        className="btn-secondary btn-sm"
        onClick={addIngredient}
        disabled={recipe.ingredients.length >= 8}
      >
        + Add Ingredient
      </button>
    </div>
  );
}
