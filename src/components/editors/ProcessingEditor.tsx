import type { ProcessingRecipe } from '../../types/recipe';
import type { ItemStack, FluidStack } from '../../types/common';
import ItemAutocomplete from '../common/ItemAutocomplete';
import FluidAutocomplete from '../common/FluidAutocomplete';
import { formatTicks } from '../../utils/tickFormatter';

interface Props {
  recipe: ProcessingRecipe;
  onChange: (recipe: ProcessingRecipe) => void;
}

export default function ProcessingEditor({ recipe, onChange }: Props) {
  // Item inputs
  const addInput = () => {
    onChange({ ...recipe, inputs: [...recipe.inputs, { item: '' }] });
  };
  const updateInput = (i: number, item: string) => {
    const next = recipe.inputs.map((inp, idx) => (idx === i ? { item } : inp));
    onChange({ ...recipe, inputs: next });
  };
  const removeInput = (i: number) => {
    onChange({ ...recipe, inputs: recipe.inputs.filter((_, idx) => idx !== i) });
  };

  // Fluid inputs
  const addFluidInput = () => {
    onChange({ ...recipe, fluidInputs: [...recipe.fluidInputs, { fluid: '', amount: 1000 }] });
  };
  const updateFluidInput = (i: number, updates: Partial<FluidStack>) => {
    const next = recipe.fluidInputs.map((f, idx) => (idx === i ? { ...f, ...updates } : f));
    onChange({ ...recipe, fluidInputs: next });
  };
  const removeFluidInput = (i: number) => {
    onChange({ ...recipe, fluidInputs: recipe.fluidInputs.filter((_, idx) => idx !== i) });
  };

  // Item outputs
  const addOutput = () => {
    onChange({ ...recipe, outputs: [...recipe.outputs, { id: '', count: 1 }] });
  };
  const updateOutput = (i: number, updates: Partial<ItemStack>) => {
    const next = recipe.outputs.map((o, idx) => (idx === i ? { ...o, ...updates } : o));
    onChange({ ...recipe, outputs: next });
  };
  const removeOutput = (i: number) => {
    onChange({ ...recipe, outputs: recipe.outputs.filter((_, idx) => idx !== i) });
  };

  // Fluid output
  const toggleFluidOutput = () => {
    if (recipe.fluidOutput) {
      onChange({ ...recipe, fluidOutput: null });
    } else {
      onChange({ ...recipe, fluidOutput: { fluid: '', amount: 1000 } });
    }
  };

  return (
    <>
      {/* Duration */}
      <div className="editor-section">
        <div className="editor-section-title">Duration</div>
        <div className="editor-field">
          <input
            type="number"
            value={recipe.duration}
            min={1}
            onChange={(e) => onChange({ ...recipe, duration: Math.max(1, parseInt(e.target.value) || 1) })}
          />
          <span className="editor-field-hint">{formatTicks(recipe.duration)}</span>
        </div>
      </div>

      {/* Item Inputs */}
      <div className="editor-section">
        <div className="editor-section-title">Item Inputs</div>
        {recipe.inputs.map((inp, i) => (
          <div key={i} className="editor-list-item">
            <div style={{ flex: 1 }}>
              <ItemAutocomplete value={inp.item} onChange={(v) => updateInput(i, v)} />
            </div>
            <button className="btn-icon" onClick={() => removeInput(i)}>&#x2715;</button>
          </div>
        ))}
        <button className="btn-secondary btn-sm" onClick={addInput}>+ Add Input</button>
      </div>

      {/* Fluid Inputs */}
      <div className="editor-section">
        <div className="editor-section-title">Fluid Inputs</div>
        {recipe.fluidInputs.map((f, i) => (
          <div key={i} className="editor-list-item">
            <div style={{ flex: 1 }}>
              <FluidAutocomplete value={f.fluid} onChange={(v) => updateFluidInput(i, { fluid: v })} />
            </div>
            <input
              type="number"
              value={f.amount}
              min={1}
              style={{ width: 70 }}
              onChange={(e) => updateFluidInput(i, { amount: Math.max(1, parseInt(e.target.value) || 1) })}
            />
            <span className="editor-field-hint">mB</span>
            <button className="btn-icon" onClick={() => removeFluidInput(i)}>&#x2715;</button>
          </div>
        ))}
        <button className="btn-secondary btn-sm" onClick={addFluidInput}>+ Add Fluid</button>
      </div>

      {/* Item Outputs */}
      <div className="editor-section">
        <div className="editor-section-title">Item Outputs</div>
        {recipe.outputs.map((out, i) => (
          <div key={i} className="editor-list-item">
            <div style={{ flex: 1 }}>
              <ItemAutocomplete value={out.id} onChange={(v) => updateOutput(i, { id: v })} />
            </div>
            <input
              type="number"
              value={out.count}
              min={1}
              style={{ width: 56 }}
              onChange={(e) => updateOutput(i, { count: Math.max(1, parseInt(e.target.value) || 1) })}
            />
            <button className="btn-icon" onClick={() => removeOutput(i)}>&#x2715;</button>
          </div>
        ))}
        <button className="btn-secondary btn-sm" onClick={addOutput}>+ Add Output</button>
      </div>

      {/* Fluid Output */}
      <div className="editor-section">
        <div className="editor-section-title">Fluid Output</div>
        {!recipe.fluidOutput ? (
          <button className="btn-secondary btn-sm" onClick={toggleFluidOutput}>+ Add Fluid Output</button>
        ) : (
          <div className="editor-list-item">
            <div style={{ flex: 1 }}>
              <FluidAutocomplete
                value={recipe.fluidOutput.fluid}
                onChange={(fluid) => onChange({ ...recipe, fluidOutput: { ...recipe.fluidOutput!, fluid } })}
              />
            </div>
            <input
              type="number"
              value={recipe.fluidOutput.amount}
              min={1}
              style={{ width: 70 }}
              onChange={(e) =>
                onChange({
                  ...recipe,
                  fluidOutput: { ...recipe.fluidOutput!, amount: Math.max(1, parseInt(e.target.value) || 1) },
                })
              }
            />
            <span className="editor-field-hint">mB</span>
            <button className="btn-icon" onClick={toggleFluidOutput}>&#x2715;</button>
          </div>
        )}
      </div>
    </>
  );
}
