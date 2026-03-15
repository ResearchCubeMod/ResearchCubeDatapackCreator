import type { ValidationIssue } from '../types/validation';
import type { ResearchNodeData } from '../types/research';
import type { RecipeData } from '../types/recipe';
import { TIER_FLUIDS } from '../data/tiers';
import { flattenPrerequisiteIds, detectCycles } from './prerequisites';
import { stripNamespace } from './idHelpers';

export function validateAll(
  nodes: Record<string, ResearchNodeData>,
  recipes: Record<string, RecipeData>
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // Research node validations
  for (const node of Object.values(nodes)) {
    if (!node.tier) {
      issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'tier', message: 'Tier is required.' });
    }

    if (!node.duration || node.duration <= 0) {
      issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'duration', message: 'Duration must be > 0.' });
    }

    if (node.itemCosts.length > 6) {
      issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'item_costs', message: `Too many item costs (${node.itemCosts.length}/6 max).` });
    }

    // Fluid must match tier
    if (node.fluidCost && node.tier) {
      const expected = TIER_FLUIDS[node.tier];
      if (expected && node.fluidCost.fluid !== expected) {
        issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'fluid_cost', message: `Fluid "${node.fluidCost.fluid}" doesn't match tier ${node.tier} (expected ${expected}).` });
      }
    }

    // Prerequisites must reference existing nodes
    if (node.prerequisites) {
      const ids = flattenPrerequisiteIds(node.prerequisites);
      for (const fullId of ids) {
        const cleanId = stripNamespace(fullId);
        if (!nodes[cleanId]) {
          issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'prerequisites', message: `Prerequisite "${fullId}" does not exist.` });
        }
      }
    }

    // Idea chip warnings
    if (node.ideaChip) {
      if (!node.ideaChip.item) {
        issues.push({ severity: 'error', target: 'research', targetId: node.id, field: 'idea_chip', message: 'Idea chip must have a base item.' });
      }
      if (!node.ideaChip.components?.['minecraft:custom_data']) {
        issues.push({ severity: 'warning', target: 'research', targetId: node.id, field: 'idea_chip', message: 'Idea chip missing custom_data (recommended for stable matching).' });
      }
      if (!node.ideaChip.components?.['minecraft:custom_name']) {
        issues.push({ severity: 'warning', target: 'research', targetId: node.id, field: 'idea_chip', message: 'Idea chip missing custom_name (players won\'t know what chip they need).' });
      }
      if (!node.ideaChip.components || Object.keys(node.ideaChip.components).length === 0) {
        issues.push({ severity: 'warning', target: 'research', targetId: node.id, field: 'idea_chip', message: 'Idea chip has no components — will match any item of that type.' });
      }
    }

    // Recipe pool references
    for (const ref of node.recipePool) {
      const recipeId = typeof ref === 'string' ? ref : ref.id;
      const cleanId = stripNamespace(recipeId);
      if (!recipes[cleanId]) {
        issues.push({ severity: 'warning', target: 'research', targetId: node.id, field: 'recipe_pool', message: `Recipe "${recipeId}" in pool does not exist.` });
      }
    }
  }

  // Cycle detection
  const cycles = detectCycles(nodes);
  for (const cycle of cycles) {
    issues.push({
      severity: 'error',
      target: 'research',
      targetId: cycle[0],
      field: 'prerequisites',
      message: `Cycle detected: ${cycle.join(' -> ')} -> ${cycle[0]}`,
    });
  }

  // Recipe validations
  for (const recipe of Object.values(recipes)) {
    if (recipe.kind === 'drive_crafting_shapeless') {
      if (recipe.ingredients.length < 1) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'ingredients', message: 'At least 1 ingredient required.' });
      }
      if (recipe.ingredients.length > 8) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'ingredients', message: `Too many ingredients (${recipe.ingredients.length}/8 max).` });
      }
      if (recipe.result.count < 1) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'result', message: 'Result count must be >= 1.' });
      }
      for (const ing of recipe.ingredients) {
        if (!ing.item) {
          issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'ingredients', message: 'Ingredient has empty item ID.' });
        }
      }
    }

    if (recipe.kind === 'drive_crafting_shaped') {
      // Validate pattern
      if (recipe.pattern.length !== 3) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'pattern', message: 'Pattern must have exactly 3 rows.' });
      }
      for (let r = 0; r < recipe.pattern.length; r++) {
        if (recipe.pattern[r].length !== 3) {
          issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'pattern', message: `Pattern row ${r} must be exactly 3 characters.` });
        }
      }
      // Every non-space char must be in key
      const usedChars = new Set<string>();
      for (const row of recipe.pattern) {
        for (const char of row) {
          if (char !== ' ') usedChars.add(char);
        }
      }
      for (const char of usedChars) {
        if (!recipe.key[char]) {
          issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'key', message: `Character "${char}" in pattern not defined in key.` });
        }
      }
      if (recipe.result.count < 1) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'result', message: 'Result count must be >= 1.' });
      }
      if (usedChars.size === 0) {
        issues.push({ severity: 'warning', target: 'recipe', targetId: recipe.id, field: 'pattern', message: 'Pattern is empty — recipe has no ingredients.' });
      }
    }

    if (recipe.kind === 'processing') {
      if (recipe.inputs.length === 0 && recipe.fluidInputs.length === 0) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'inputs', message: 'At least one input (item or fluid) required.' });
      }
      if (recipe.outputs.length === 0) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'outputs', message: 'At least one output required.' });
      }
      if (recipe.duration <= 0) {
        issues.push({ severity: 'error', target: 'recipe', targetId: recipe.id, field: 'duration', message: 'Duration must be > 0.' });
      }
    }
  }

  return issues;
}
