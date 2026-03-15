export type ValidationSeverity = 'error' | 'warning';
export type ValidationTarget = 'research' | 'recipe';

export interface ValidationIssue {
  severity: ValidationSeverity;
  target: ValidationTarget;
  targetId: string;
  field: string;
  message: string;
}
