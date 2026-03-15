import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { ResearchNodeData } from '../types/research';
import type { RecipeData } from '../types/recipe';
import { serializeResearch, serializeRecipe, serializeAdvancement } from './serialization';

export async function exportToZip(
  nodes: Record<string, ResearchNodeData>,
  recipes: Record<string, RecipeData>,
  includeAdvancements: boolean
): Promise<void> {
  const zip = new JSZip();

  // Research definition files
  for (const node of Object.values(nodes)) {
    const json = serializeResearch(node);
    zip.file(
      `data/researchcube/research/${node.id}.json`,
      JSON.stringify(json, null, 2)
    );
  }

  // Recipe files
  for (const recipe of Object.values(recipes)) {
    const json = serializeRecipe(recipe);
    zip.file(
      `data/researchcube/recipe/${recipe.id}.json`,
      JSON.stringify(json, null, 2)
    );
  }

  // Advancement files (optional)
  if (includeAdvancements) {
    for (const node of Object.values(nodes)) {
      const json = serializeAdvancement(node, nodes);
      zip.file(
        `data/researchcube/advancement/research/${node.id}.json`,
        JSON.stringify(json, null, 2)
      );
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, 'researchcube-datapack.zip');
}
