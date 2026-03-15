import { useState, useMemo } from 'react';
import type { DriveCraftingShapedRecipe } from '../../types/recipe';
import type { Ingredient } from '../../types/common';
import ItemAutocomplete from '../common/ItemAutocomplete';
import './ShapedGrid.css';

interface Props {
  recipe: DriveCraftingShapedRecipe;
  onChange: (recipe: DriveCraftingShapedRecipe) => void;
}

export default function DriveCraftingShaped({ recipe, onChange }: Props) {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);

  // Decode the pattern+key into a 3x3 grid of item IDs (or null)
  const grid: (string | null)[] = useMemo(() => {
    const result: (string | null)[] = Array(9).fill(null);
    for (let row = 0; row < 3; row++) {
      const rowStr = recipe.pattern[row] || '   ';
      for (let col = 0; col < 3; col++) {
        const char = rowStr[col];
        if (char && char !== ' ' && recipe.key[char]) {
          result[row * 3 + col] = recipe.key[char].item;
        }
      }
    }
    return result;
  }, [recipe.pattern, recipe.key]);

  const updateCell = (index: number, itemId: string | null) => {
    const newGrid = [...grid];
    newGrid[index] = itemId || null;

    // Rebuild pattern and key from grid
    const letterMap = new Map<string, string>(); // item -> letter
    const nextKey: Record<string, Ingredient> = {};
    let letterIndex = 0;
    const letters = 'ABCDEFGH';

    const newPattern: [string, string, string] = ['   ', '   ', '   '];

    for (let row = 0; row < 3; row++) {
      let rowStr = '';
      for (let col = 0; col < 3; col++) {
        const item = newGrid[row * 3 + col];
        if (!item) {
          rowStr += ' ';
        } else {
          let letter = letterMap.get(item);
          if (!letter) {
            letter = letters[letterIndex++] || 'Z';
            letterMap.set(item, letter);
            nextKey[letter] = { item };
          }
          rowStr += letter;
        }
      }
      newPattern[row] = rowStr;
    }

    onChange({ ...recipe, pattern: newPattern, key: nextKey });
  };

  return (
    <div className="editor-section">
      <div className="editor-section-title">Crafting Grid (3x3)</div>

      <div className="shaped-grid">
        {grid.map((item, i) => (
          <div
            key={i}
            className={`shaped-grid-cell ${selectedCell === i ? 'selected' : ''} ${item ? 'filled' : ''}`}
            onClick={() => setSelectedCell(i)}
          >
            {item ? item.split(':')[1] || item : ''}
          </div>
        ))}
      </div>

      {selectedCell !== null && (
        <div className="editor-field" style={{ marginTop: 8 }}>
          <label className="editor-field-label">Cell [{Math.floor(selectedCell / 3)}, {selectedCell % 3}]</label>
          <div className="editor-list-item">
            <div style={{ flex: 1 }}>
              <ItemAutocomplete
                value={grid[selectedCell] || ''}
                onChange={(v) => updateCell(selectedCell, v || null)}
              />
            </div>
            <button
              className="btn-icon"
              onClick={() => {
                updateCell(selectedCell, null);
              }}
              title="Clear cell"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}

      <div className="editor-field" style={{ marginTop: 8 }}>
        <label className="editor-field-label">Pattern Preview</label>
        <pre style={{
          background: 'var(--bg-tertiary)',
          padding: '6px 8px',
          borderRadius: 'var(--radius-sm)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          margin: 0,
        }}>
{recipe.pattern.map((row) => `"${row}"`).join('\n')}
        </pre>
      </div>

      {Object.keys(recipe.key).length > 0 && (
        <div className="editor-field">
          <label className="editor-field-label">Key</label>
          {Object.entries(recipe.key).map(([char, ing]) => (
            <div key={char} className="editor-field-hint">
              {char} = {ing.item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
