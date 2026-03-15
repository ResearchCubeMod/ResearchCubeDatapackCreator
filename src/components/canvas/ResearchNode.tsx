import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ResearchNodeData } from '../../types/research';
import { TIER_INFO } from '../../data/tiers';
import './ResearchNode.css';

function ResearchNodeComponent({ data, selected }: NodeProps & { data: ResearchNodeData }) {
  const nodeData = data as unknown as ResearchNodeData;
  const tierInfo = TIER_INFO[nodeData.tier];
  const displayName = nodeData.name || nodeData.id;

  return (
    <div className={`research-node ${selected ? 'selected' : ''}`}>
      <Handle type="target" position={Position.Top} className="research-handle" />
      <div className="research-node-header" style={{ background: tierInfo.color }}>
        <span className="research-node-tier">{nodeData.tier}</span>
        {nodeData.ideaChip && <span className="research-node-chip-badge" title="Requires Idea Chip">IC</span>}
      </div>
      <div className="research-node-body">
        <div className="research-node-name">{displayName}</div>
        {nodeData.category && (
          <div className="research-node-category">{nodeData.category}</div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="research-handle" />
    </div>
  );
}

export default memo(ResearchNodeComponent);
