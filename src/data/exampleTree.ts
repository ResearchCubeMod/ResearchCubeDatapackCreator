import type { ResearchNodeData } from '../types/research';

type NodeDef = Omit<ResearchNodeData, 'position'>;

const defs: NodeDef[] = [
  { id: 'unstable_signal', name: 'Unstable Signal', description: 'A barely coherent data stream.', category: 'signals', tier: 'UNSTABLE', duration: 600, prerequisites: null, itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 500 }, ideaChip: null, recipePool: [] },
  { id: 'fragmented_data', name: 'Fragmented Data', description: 'Corrupted patterns hinting at something more.', category: 'signals', tier: 'UNSTABLE', duration: 800, prerequisites: null, itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 500 }, ideaChip: null, recipePool: [] },
  { id: 'basic_circuit', name: 'Basic Circuit', description: 'Fundamental circuit logic.', category: 'circuits', tier: 'BASIC', duration: 1200, prerequisites: null, itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'energy_handling', name: 'Energy Handling', description: 'stable energy flow control.', category: 'energy', tier: 'BASIC', duration: 2400, prerequisites: 'researchcube:basic_circuit', itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'basic_optics', name: 'Basic Optics', description: 'Light manipulation fundamentals.', category: 'optics', tier: 'BASIC', duration: 1800, prerequisites: 'researchcube:basic_circuit', itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'material_synthesis', name: 'Material Synthesis', description: 'Creating new materials from base components.', category: 'materials', tier: 'BASIC', duration: 1200, prerequisites: null, itemCosts: [], fluidCost: { fluid: 'researchcube:thinking_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'advanced_processor', name: 'Advanced Processor', description: 'A more powerful data processing unit.', category: 'circuits', tier: 'ADVANCED', duration: 6000, prerequisites: 'researchcube:energy_handling', itemCosts: [], fluidCost: { fluid: 'researchcube:pondering_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'quantum_resonance', name: 'Quantum Resonance', description: 'Harnessing quantum effects for energy.', category: 'energy', tier: 'ADVANCED', duration: 4800, prerequisites: 'researchcube:energy_handling', itemCosts: [], fluidCost: { fluid: 'researchcube:pondering_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'photonic_amplifier', name: 'Photonic Amplifier', description: 'Amplifying light-based signals.', category: 'optics', tier: 'ADVANCED', duration: 5400, prerequisites: { type: 'AND', values: ['researchcube:energy_handling', 'researchcube:basic_optics'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:pondering_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'alloy_fabrication', name: 'Alloy Fabrication', description: 'Advanced metal alloy creation.', category: 'materials', tier: 'ADVANCED', duration: 5400, prerequisites: 'researchcube:material_synthesis', itemCosts: [], fluidCost: { fluid: 'researchcube:pondering_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'neural_interface', name: 'Neural Interface', description: 'Direct brain-computer link technology.', category: 'computing', tier: 'ADVANCED', duration: 6000, prerequisites: 'researchcube:advanced_processor', itemCosts: [], fluidCost: { fluid: 'researchcube:pondering_fluid', amount: 1000 }, ideaChip: null, recipePool: [] },
  { id: 'waveform_analysis', name: 'Waveform Analysis', description: 'Deep analysis of quantum waveforms.', category: 'energy', tier: 'PRECISE', duration: 9600, prerequisites: 'researchcube:quantum_resonance', itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'precision_engineering', name: 'Precision Engineering', description: 'Sub-atomic precision manufacturing.', category: 'materials', tier: 'PRECISE', duration: 9000, prerequisites: 'researchcube:alloy_fabrication', itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'nanostructures', name: 'Nanostructures', description: 'Self-assembling nanoscale structures.', category: 'materials', tier: 'PRECISE', duration: 9000, prerequisites: { type: 'AND', values: ['researchcube:advanced_processor', 'researchcube:precision_engineering'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'biophotonic_matrix', name: 'Biophotonic Matrix', description: 'Organic-photonic hybrid computing.', category: 'computing', tier: 'PRECISE', duration: 9600, prerequisites: { type: 'AND', values: ['researchcube:neural_interface', 'researchcube:photonic_amplifier'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'temporal_calibration', name: 'Temporal Calibration', description: 'Fine-tuning temporal distortions.', category: 'temporal', tier: 'PRECISE', duration: 10800, prerequisites: 'researchcube:waveform_analysis', itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'molecular_assembly', name: 'Molecular Assembly', description: 'Atom-by-atom construction.', category: 'materials', tier: 'FLAWLESS', duration: 18000, prerequisites: 'researchcube:nanostructures', itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'dimensional_folding', name: 'Dimensional Folding', description: 'Bending space-time locally.', category: 'temporal', tier: 'FLAWLESS', duration: 18000, prerequisites: 'researchcube:temporal_calibration', itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'cognitive_framework', name: 'Cognitive Framework', description: 'True artificial cognition.', category: 'computing', tier: 'FLAWLESS', duration: 18000, prerequisites: { type: 'AND', values: ['researchcube:neural_interface', 'researchcube:biophotonic_matrix'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'zero_point_energy', name: 'Zero Point Energy', description: 'Extracting energy from quantum vacuum.', category: 'energy', tier: 'FLAWLESS', duration: 18000, prerequisites: { type: 'AND', values: ['researchcube:waveform_analysis', 'researchcube:dimensional_folding'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:reasoning_fluid', amount: 2000 }, ideaChip: null, recipePool: [] },
  { id: 'singularity_core', name: 'Singularity Core', description: 'Harnessing a contained singularity.', category: 'convergence', tier: 'SELF_AWARE', duration: 36000, prerequisites: { type: 'AND', values: ['researchcube:molecular_assembly', 'researchcube:zero_point_energy'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:imagination_fluid', amount: 4000 }, ideaChip: null, recipePool: [] },
  { id: 'transcendent_logic', name: 'Transcendent Logic', description: 'Beyond binary — beyond reason.', category: 'convergence', tier: 'SELF_AWARE', duration: 36000, prerequisites: { type: 'AND', values: ['researchcube:singularity_core', 'researchcube:cognitive_framework'] }, itemCosts: [], fluidCost: { fluid: 'researchcube:imagination_fluid', amount: 4000 }, ideaChip: null, recipePool: [] },
  { id: 'omniscient_matrix', name: 'Omniscient Matrix', description: 'Perfect understanding of all systems.', category: 'convergence', tier: 'SELF_AWARE', duration: 72000, prerequisites: 'researchcube:transcendent_logic', itemCosts: [], fluidCost: { fluid: 'researchcube:imagination_fluid', amount: 4000 }, ideaChip: null, recipePool: [] },
];

// Pre-computed tree layout positions
const positions: Record<string, { x: number; y: number }> = {
  unstable_signal:      { x: 50,   y: 50 },
  fragmented_data:      { x: 300,  y: 50 },
  basic_circuit:        { x: 550,  y: 50 },
  material_synthesis:   { x: 900,  y: 50 },
  energy_handling:      { x: 450,  y: 200 },
  basic_optics:         { x: 700,  y: 200 },
  advanced_processor:   { x: 350,  y: 370 },
  quantum_resonance:    { x: 550,  y: 370 },
  photonic_amplifier:   { x: 700,  y: 370 },
  alloy_fabrication:    { x: 900,  y: 250 },
  neural_interface:     { x: 250,  y: 520 },
  waveform_analysis:    { x: 550,  y: 520 },
  precision_engineering:{ x: 900,  y: 420 },
  nanostructures:       { x: 800,  y: 570 },
  biophotonic_matrix:   { x: 350,  y: 670 },
  temporal_calibration: { x: 550,  y: 670 },
  dimensional_folding:  { x: 550,  y: 820 },
  cognitive_framework:  { x: 250,  y: 820 },
  molecular_assembly:   { x: 800,  y: 730 },
  zero_point_energy:    { x: 550,  y: 970 },
  singularity_core:     { x: 700,  y: 970 },
  transcendent_logic:   { x: 500,  y: 1120 },
  omniscient_matrix:    { x: 500,  y: 1270 },
};

export function getExampleTree(): Record<string, ResearchNodeData> {
  const result: Record<string, ResearchNodeData> = {};
  for (const def of defs) {
    result[def.id] = {
      ...def,
      position: positions[def.id] || { x: 0, y: 0 },
    };
  }
  return result;
}
