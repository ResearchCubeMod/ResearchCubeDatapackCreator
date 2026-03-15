import JSZip from 'jszip';
import type { ResearchNodeData, Tier, Prerequisite } from '../types/research';
import type { RecipeData } from '../types/recipe';
import { TIERS } from '../types/research';

export async function importFiles(
  files: FileList
): Promise<{ nodes: Record<string, ResearchNodeData>; recipes: Record<string, RecipeData> }> {
  const nodes: Record<string, ResearchNodeData> = {};
  const recipes: Record<string, RecipeData> = {};

  for (const file of Array.from(files)) {
    if (file.name.endsWith('.zip')) {
      const zip = await JSZip.loadAsync(file);
      for (const [path, zipEntry] of Object.entries(zip.files)) {
        if (zipEntry.dir || !path.endsWith('.json')) continue;
        const text = await zipEntry.async('text');
        const json = JSON.parse(text);
        const filename = path.split('/').pop()!.replace('.json', '');

        if (path.includes('/research/') && !path.includes('/advancement/')) {
          const node = parseResearchJson(filename, json);
          if (node) nodes[node.id] = node;
        } else if (path.includes('/recipe/')) {
          const recipe = parseRecipeJson(filename, json);
          if (recipe) recipes[recipe.id] = recipe;
        }
      }
    } else if (file.name.endsWith('.json')) {
      const text = await file.text();
      const json = JSON.parse(text);
      const filename = file.name.replace('.json', '');

      // Auto-detect file type
      if (json.tier && TIERS.includes(json.tier)) {
        const node = parseResearchJson(filename, json);
        if (node) nodes[node.id] = node;
      } else if (json.type) {
        const recipe = parseRecipeJson(filename, json);
        if (recipe) recipes[recipe.id] = recipe;
      }
    }
  }

  // Auto-layout imported nodes
  autoLayoutNodes(nodes);

  return { nodes, recipes };
}

function parseResearchJson(id: string, json: Record<string, unknown>): ResearchNodeData | null {
  if (!json.tier) return null;

  return {
    id,
    name: (json.name as string) || '',
    description: (json.description as string) || '',
    category: (json.category as string) || '',
    tier: json.tier as Tier,
    duration: (json.duration as number) || 1200,
    prerequisites: (json.prerequisites as Prerequisite) || null,
    itemCosts: (json.item_costs as Array<{ item: string; count?: number }>)?.map((ic) => ({
      item: ic.item,
      count: ic.count ?? 1,
    })) || [],
    fluidCost: json.fluid_cost
      ? {
          fluid: (json.fluid_cost as { fluid: string }).fluid,
          amount: (json.fluid_cost as { amount?: number }).amount ?? 1000,
        }
      : null,
    ideaChip: json.idea_chip
      ? {
          item: (json.idea_chip as { item: string }).item,
          components: (json.idea_chip as { components?: Record<string, unknown> }).components as ResearchNodeData['ideaChip'] extends null ? never : NonNullable<ResearchNodeData['ideaChip']>['components'],
        }
      : null,
    recipePool: (json.recipe_pool as ResearchNodeData['recipePool']) || [],
    position: { x: 0, y: 0 },
  };
}

function parseRecipeJson(id: string, json: Record<string, unknown>): RecipeData | null {
  const type = json.type as string;

  if (type === 'researchcube:drive_crafting') {
    if (json.pattern) {
      return {
        kind: 'drive_crafting_shaped',
        id,
        pattern: json.pattern as [string, string, string],
        key: json.key as Record<string, { item: string }>,
        result: json.result as { id: string; count: number },
        group: (json.group as string) || '',
      };
    }
    return {
      kind: 'drive_crafting_shapeless',
      id,
      ingredients: json.ingredients as Array<{ item: string }>,
      result: json.result as { id: string; count: number },
      group: (json.group as string) || '',
    };
  }

  if (type === 'researchcube:processing') {
    return {
      kind: 'processing',
      id,
      inputs: (json.inputs as Array<{ item: string }>) || [],
      fluidInputs: (json.fluid_inputs as Array<{ fluid: string; amount: number }>) || [],
      outputs: json.outputs as Array<{ id: string; count: number }>,
      fluidOutput: json.fluid_output
        ? (json.fluid_output as { fluid: string; amount: number })
        : null,
      duration: (json.duration as number) || 200,
      group: (json.group as string) || '',
    };
  }

  return null;
}

function autoLayoutNodes(nodes: Record<string, ResearchNodeData>) {
  const ids = Object.keys(nodes);
  const cols = Math.ceil(Math.sqrt(ids.length));
  ids.forEach((id, i) => {
    nodes[id].position = {
      x: (i % cols) * 250 + 100,
      y: Math.floor(i / cols) * 200 + 100,
    };
  });
}
