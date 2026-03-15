import type { ResearchNodeData, Prerequisite } from '../types/research';
import type { RecipeData } from '../types/recipe';
import { TIER_INFO } from '../data/tiers';
import { flattenPrerequisiteIds } from './prerequisites';
import { stripNamespace } from './idHelpers';

export function serializeResearch(node: ResearchNodeData): Record<string, unknown> {
  const json: Record<string, unknown> = {};

  if (node.name) json.name = node.name;
  if (node.description) json.description = node.description;
  if (node.category) json.category = node.category;

  json.tier = node.tier;
  json.duration = node.duration;

  if (node.prerequisites) {
    json.prerequisites = serializePrerequisites(node.prerequisites);
  }

  if (node.itemCosts.length > 0) {
    json.item_costs = node.itemCosts.map((ic) => {
      const entry: Record<string, unknown> = { item: ic.item };
      if (ic.count !== 1) entry.count = ic.count;
      return entry;
    });
  }

  if (node.fluidCost) {
    json.fluid_cost = {
      fluid: node.fluidCost.fluid,
      amount: node.fluidCost.amount,
    };
  }

  if (node.ideaChip) {
    const chip: Record<string, unknown> = { item: node.ideaChip.item };
    if (node.ideaChip.components && Object.keys(node.ideaChip.components).length > 0) {
      chip.components = node.ideaChip.components;
    }
    json.idea_chip = chip;
  }

  if (node.recipePool.length > 0) {
    json.recipe_pool = node.recipePool;
  }

  return json;
}

function serializePrerequisites(prereq: Prerequisite): unknown {
  if (typeof prereq === 'string') return prereq;
  return {
    type: prereq.type,
    values: prereq.values.map(serializePrerequisites),
  };
}

export function serializeRecipe(recipe: RecipeData): Record<string, unknown> {
  if (recipe.kind === 'drive_crafting_shapeless') {
    const json: Record<string, unknown> = {
      type: 'researchcube:drive_crafting',
      recipe_id: `researchcube:${recipe.id}`,
      ingredients: recipe.ingredients,
      result: recipe.result,
    };
    if (recipe.group) json.group = recipe.group;
    return json;
  }

  if (recipe.kind === 'drive_crafting_shaped') {
    const json: Record<string, unknown> = {
      type: 'researchcube:drive_crafting',
      recipe_id: `researchcube:${recipe.id}`,
      pattern: recipe.pattern,
      key: recipe.key,
      result: recipe.result,
    };
    if (recipe.group) json.group = recipe.group;
    return json;
  }

  // Processing
  const json: Record<string, unknown> = {
    type: 'researchcube:processing',
  };
  if (recipe.inputs.length > 0) json.inputs = recipe.inputs;
  if (recipe.fluidInputs.length > 0) json.fluid_inputs = recipe.fluidInputs;
  json.outputs = recipe.outputs;
  if (recipe.fluidOutput) json.fluid_output = recipe.fluidOutput;
  json.duration = recipe.duration;
  if (recipe.group) json.group = recipe.group;
  return json;
}

export function serializeAdvancement(
  node: ResearchNodeData,
  _allNodes: Record<string, ResearchNodeData>
): Record<string, unknown> {
  const tierInfo = TIER_INFO[node.tier];

  // Determine parent
  let parent = 'researchcube:root';
  if (node.prerequisites) {
    const ids = flattenPrerequisiteIds(node.prerequisites);
    if (ids.length > 0) {
      parent = `researchcube:research/${stripNamespace(ids[0])}`;
    }
  }

  return {
    parent,
    display: {
      icon: { id: tierInfo.cube },
      title: node.name || node.id,
      description: node.description || '',
      show_toast: true,
      announce_to_chat: true,
    },
    criteria: {
      complete: {
        trigger: 'researchcube:complete_research',
        conditions: {
          research_id: `researchcube:${node.id}`,
        },
      },
    },
  };
}
