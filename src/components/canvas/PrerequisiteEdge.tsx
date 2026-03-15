import { memo } from 'react';
import { BaseEdge, getSmoothStepPath, type EdgeProps } from '@xyflow/react';

function PrerequisiteEdgeComponent(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style, data } = props;
  const mode = data?.mode as string | null;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 8,
  });

  return (
    <BaseEdge
      path={edgePath}
      style={{
        ...style,
        strokeWidth: 2,
        stroke: mode === 'OR' ? 'var(--warning)' : 'var(--accent)',
        strokeDasharray: mode === 'OR' ? '6 3' : undefined,
      }}
    />
  );
}

export default memo(PrerequisiteEdgeComponent);
