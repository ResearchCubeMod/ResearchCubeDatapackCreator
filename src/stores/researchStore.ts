import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { ResearchNodeData, Prerequisite } from '../types/research';

interface ResearchStoreState {
  nodes: Record<string, ResearchNodeData>;
}

interface ResearchStoreActions {
  addNode: (node: ResearchNodeData) => void;
  updateNode: (id: string, updates: Partial<ResearchNodeData>) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, position: { x: number; y: number }) => void;
  addPrerequisite: (targetId: string, sourceId: string) => void;
  removePrerequisite: (targetId: string, sourceId: string) => void;
  setPrerequisiteMode: (nodeId: string, mode: 'AND' | 'OR') => void;
  setNodes: (nodes: Record<string, ResearchNodeData>) => void;
  clearAll: () => void;
}

export type ResearchStore = ResearchStoreState & ResearchStoreActions;

export const useResearchStore = create<ResearchStore>()(
  persist(
    immer((set) => ({
      nodes: {},

      addNode: (node) =>
        set((state) => {
          state.nodes[node.id] = node;
        }),

      updateNode: (id, updates) =>
        set((state) => {
          if (state.nodes[id]) {
            Object.assign(state.nodes[id], updates);
          }
        }),

      removeNode: (id) =>
        set((state) => {
          delete state.nodes[id];
          // Clean up prerequisites referencing this node
          const fullId = `researchcube:${id}`;
          for (const node of Object.values(state.nodes)) {
            if (!node.prerequisites) continue;
            node.prerequisites = removePrereqReference(node.prerequisites, fullId);
          }
        }),

      updateNodePosition: (id, position) =>
        set((state) => {
          if (state.nodes[id]) {
            state.nodes[id].position = position;
          }
        }),

      addPrerequisite: (targetId, sourceId) =>
        set((state) => {
          const node = state.nodes[targetId];
          if (!node) return;
          const fullSourceId = `researchcube:${sourceId}`;

          if (!node.prerequisites) {
            node.prerequisites = fullSourceId;
          } else if (typeof node.prerequisites === 'string') {
            if (node.prerequisites === fullSourceId) return;
            node.prerequisites = {
              type: 'AND',
              values: [node.prerequisites, fullSourceId],
            };
          } else {
            const flat = flattenStrings(node.prerequisites);
            if (flat.includes(fullSourceId)) return;
            node.prerequisites.values.push(fullSourceId);
          }
        }),

      removePrerequisite: (targetId, sourceId) =>
        set((state) => {
          const node = state.nodes[targetId];
          if (!node || !node.prerequisites) return;
          const fullSourceId = `researchcube:${sourceId}`;
          node.prerequisites = removePrereqReference(node.prerequisites, fullSourceId);
        }),

      setPrerequisiteMode: (nodeId, mode) =>
        set((state) => {
          const node = state.nodes[nodeId];
          if (!node || !node.prerequisites || typeof node.prerequisites === 'string') return;
          node.prerequisites.type = mode;
        }),

      setNodes: (nodes) =>
        set((state) => {
          state.nodes = nodes;
        }),

      clearAll: () =>
        set((state) => {
          state.nodes = {};
        }),
    })),
    {
      name: 'researchcube-research-store',
    }
  )
);

function flattenStrings(prereq: Prerequisite): string[] {
  if (typeof prereq === 'string') return [prereq];
  return prereq.values.flatMap(flattenStrings);
}

function removePrereqReference(
  prereq: Prerequisite,
  idToRemove: string
): Prerequisite | null {
  if (typeof prereq === 'string') {
    return prereq === idToRemove ? null : prereq;
  }
  const filtered = prereq.values
    .map((v) => removePrereqReference(v, idToRemove))
    .filter((v): v is Prerequisite => v !== null);

  if (filtered.length === 0) return null;
  if (filtered.length === 1) return filtered[0];
  return { type: prereq.type, values: filtered };
}
