import type { Edge } from '@xyflow/react';
import type { Prerequisite, ResearchNodeData } from '../types/research';
import { stripNamespace } from './idHelpers';

export function flattenPrerequisiteIds(prereq: Prerequisite): string[] {
  if (typeof prereq === 'string') return [prereq];
  return prereq.values.flatMap(flattenPrerequisiteIds);
}

export function getPrerequisiteMode(prereq: Prerequisite | null): 'AND' | 'OR' | null {
  if (!prereq || typeof prereq === 'string') return null;
  return prereq.type;
}

export function deriveEdges(nodes: Record<string, ResearchNodeData>): Edge[] {
  const edges: Edge[] = [];

  for (const node of Object.values(nodes)) {
    if (!node.prerequisites) continue;
    const ids = flattenPrerequisiteIds(node.prerequisites);
    const mode = typeof node.prerequisites === 'object' ? node.prerequisites.type : null;

    for (const sourceFullId of ids) {
      const sourceId = stripNamespace(sourceFullId);
      if (!nodes[sourceId]) continue;

      edges.push({
        id: `${sourceId}->${node.id}`,
        source: sourceId,
        target: node.id,
        type: 'prerequisite',
        data: { mode },
        animated: mode === 'OR',
      });
    }
  }

  return edges;
}

export function detectCycles(nodes: Record<string, ResearchNodeData>): string[][] {
  const cycles: string[][] = [];
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color: Record<string, number> = {};
  const parent: Record<string, string | null> = {};

  for (const id of Object.keys(nodes)) {
    color[id] = WHITE;
  }

  function dfs(nodeId: string, path: string[]): void {
    color[nodeId] = GRAY;
    path.push(nodeId);

    const node = nodes[nodeId];
    if (node.prerequisites) {
      const prereqIds = flattenPrerequisiteIds(node.prerequisites).map(stripNamespace);
      for (const prereqId of prereqIds) {
        if (!nodes[prereqId]) continue;
        if (color[prereqId] === GRAY) {
          // Found a cycle - extract it
          const cycleStart = path.indexOf(prereqId);
          cycles.push(path.slice(cycleStart));
          return;
        }
        if (color[prereqId] === WHITE) {
          parent[prereqId] = nodeId;
          dfs(prereqId, [...path]);
        }
      }
    }

    color[nodeId] = BLACK;
  }

  for (const id of Object.keys(nodes)) {
    if (color[id] === WHITE) {
      dfs(id, []);
    }
  }

  return cycles;
}
