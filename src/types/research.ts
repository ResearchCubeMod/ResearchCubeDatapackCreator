import type { ItemCost, FluidCost } from './common';

export const TIERS = ['UNSTABLE', 'BASIC', 'ADVANCED', 'PRECISE', 'FLAWLESS', 'SELF_AWARE'] as const;
export type Tier = typeof TIERS[number];

export const CATEGORIES = ['circuits', 'energy', 'optics', 'materials', 'signals', 'temporal', 'computing', 'convergence'] as const;

export type Prerequisite = string | CompoundPrerequisite;

export interface CompoundPrerequisite {
  type: 'AND' | 'OR';
  values: Prerequisite[];
}

export interface IdeaChipComponents {
  'minecraft:custom_name'?: string;
  'minecraft:custom_data'?: Record<string, unknown>;
}

export interface IdeaChip {
  item: string;
  components?: IdeaChipComponents;
}

export type WeightedRecipe = string | { id: string; weight: number };

export interface ResearchNodeData {
  id: string;
  name: string;
  description: string;
  category: string;
  tier: Tier;
  duration: number;
  prerequisites: Prerequisite | null;
  itemCosts: ItemCost[];
  fluidCost: FluidCost | null;
  ideaChip: IdeaChip | null;
  recipePool: WeightedRecipe[];
  position: { x: number; y: number };
}

export function createDefaultResearchNode(id: string, position: { x: number; y: number }): ResearchNodeData {
  return {
    id,
    name: '',
    description: '',
    category: '',
    tier: 'BASIC',
    duration: 1200,
    prerequisites: null,
    itemCosts: [],
    fluidCost: null,
    ideaChip: null,
    recipePool: [],
    position,
  };
}
