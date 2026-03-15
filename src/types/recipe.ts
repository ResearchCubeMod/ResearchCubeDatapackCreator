import type { Ingredient, ItemStack, FluidStack } from './common';

export type RecipeKind = 'drive_crafting_shapeless' | 'drive_crafting_shaped' | 'processing';

export interface DriveCraftingShapelessRecipe {
  kind: 'drive_crafting_shapeless';
  id: string;
  ingredients: Ingredient[];
  result: ItemStack;
  group: string;
}

export interface DriveCraftingShapedRecipe {
  kind: 'drive_crafting_shaped';
  id: string;
  pattern: [string, string, string];
  key: Record<string, Ingredient>;
  result: ItemStack;
  group: string;
}

export interface ProcessingRecipe {
  kind: 'processing';
  id: string;
  inputs: Ingredient[];
  fluidInputs: FluidStack[];
  outputs: ItemStack[];
  fluidOutput: FluidStack | null;
  duration: number;
  group: string;
}

export type RecipeData = DriveCraftingShapelessRecipe | DriveCraftingShapedRecipe | ProcessingRecipe;

export function createDefaultShapelessRecipe(id: string): DriveCraftingShapelessRecipe {
  return {
    kind: 'drive_crafting_shapeless',
    id,
    ingredients: [{ item: 'minecraft:stone' }],
    result: { id: 'minecraft:stone', count: 1 },
    group: '',
  };
}

export function createDefaultShapedRecipe(id: string): DriveCraftingShapedRecipe {
  return {
    kind: 'drive_crafting_shaped',
    id,
    pattern: ['   ', '   ', '   '],
    key: {},
    result: { id: 'minecraft:stone', count: 1 },
    group: '',
  };
}

export function createDefaultProcessingRecipe(id: string): ProcessingRecipe {
  return {
    kind: 'processing',
    id,
    inputs: [{ item: 'minecraft:stone' }],
    fluidInputs: [],
    outputs: [{ id: 'minecraft:stone', count: 1 }],
    fluidOutput: null,
    duration: 200,
    group: '',
  };
}
