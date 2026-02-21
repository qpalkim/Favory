export function getCategoryFromLabel<T extends string>(
  label: string | null,
  labelMap: Record<T, string>
): T | undefined {
  if (!label) return undefined;

  return Object.entries(labelMap).find(
    ([, value]) => value === label
  )?.[0] as T | undefined;
}