export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s\-]+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase();
}

export function toResearchId(snakeCaseId: string): string {
  return `researchcube:${snakeCaseId}`;
}

export function stripNamespace(fullId: string): string {
  const idx = fullId.indexOf(':');
  return idx >= 0 ? fullId.substring(idx + 1) : fullId;
}

let nextCounter = 1;

export function generateUniqueId(baseName: string, existingIds: Set<string>): string {
  let candidate = toSnakeCase(baseName);
  if (!candidate) candidate = 'new_research';
  if (!existingIds.has(candidate)) return candidate;

  while (existingIds.has(`${candidate}_${nextCounter}`)) {
    nextCounter++;
  }
  return `${candidate}_${nextCounter++}`;
}
