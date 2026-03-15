import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type NodeTypes,
  type EdgeTypes,
  type OnNodesChange,
  type OnConnect,
  type OnEdgesDelete,
  type Connection,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useResearchStore } from '../../stores/researchStore';
import { useUIStore } from '../../stores/uiStore';
import { deriveEdges } from '../../utils/prerequisites';
import { generateUniqueId } from '../../utils/idHelpers';
import { createDefaultResearchNode } from '../../types/research';
import ResearchNodeComponent from './ResearchNode';
import PrerequisiteEdge from './PrerequisiteEdge';
import { TIER_INFO } from '../../data/tiers';
import './ResearchTreeCanvas.css';

const nodeTypes: NodeTypes = {
  research: ResearchNodeComponent as unknown as NodeTypes['research'],
};

const edgeTypes: EdgeTypes = {
  prerequisite: PrerequisiteEdge,
};

export default function ResearchTreeCanvas() {
  const allNodes = useResearchStore((s) => s.nodes);
  const updateNodePosition = useResearchStore((s) => s.updateNodePosition);
  const addNode = useResearchStore((s) => s.addNode);
  const removeNode = useResearchStore((s) => s.removeNode);
  const addPrerequisite = useResearchStore((s) => s.addPrerequisite);
  const removePrerequisite = useResearchStore((s) => s.removePrerequisite);
  const selectNode = useUIStore((s) => s.selectNode);
  const selectedNodeId = useUIStore((s) => s.selectedNodeId);

  const flowNodes = useMemo(() => {
    return Object.values(allNodes).map((node) => ({
      id: node.id,
      type: 'research' as const,
      position: node.position,
      data: node as unknown as Record<string, unknown>,
      selected: node.id === selectedNodeId,
    }));
  }, [allNodes, selectedNodeId]);

  const flowEdges = useMemo(() => deriveEdges(allNodes), [allNodes]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      // Apply position changes to store
      for (const change of changes) {
        if (change.type === 'position' && change.position) {
          updateNodePosition(change.id, change.position);
        }
        if (change.type === 'remove') {
          removeNode(change.id);
          selectNode(null);
        }
      }
    },
    [updateNodePosition, removeNode, selectNode]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      if (connection.source && connection.target) {
        addPrerequisite(connection.target, connection.source);
      }
    },
    [addPrerequisite]
  );

  const onEdgesDelete: OnEdgesDelete = useCallback(
    (edges) => {
      for (const edge of edges) {
        removePrerequisite(edge.target, edge.source);
      }
    },
    [removePrerequisite]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  const handleAddNode = useCallback(() => {
    const existingIds = new Set(Object.keys(allNodes));
    const id = generateUniqueId('new_research', existingIds);
    const node = createDefaultResearchNode(id, {
      x: 200 + Math.random() * 200,
      y: 200 + Math.random() * 200,
    });
    addNode(node);
    selectNode(id);
  }, [allNodes, addNode, selectNode]);

  return (
    <div className="research-tree-canvas">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        defaultEdgeOptions={{ type: 'prerequisite' }}
        fitView
        deleteKeyCode="Delete"
        proOptions={{ hideAttribution: true }}
        style={{ background: 'var(--bg-primary)' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
        <Controls
          showInteractive={false}
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
        />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as unknown as { tier?: string };
            const tier = data?.tier;
            if (tier && tier in TIER_INFO) {
              return TIER_INFO[tier as keyof typeof TIER_INFO].color;
            }
            return 'var(--border)';
          }}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
          }}
        />
      </ReactFlow>
      <button className="btn-primary canvas-add-btn" onClick={handleAddNode}>
        + Add Research Node
      </button>
    </div>
  );
}
