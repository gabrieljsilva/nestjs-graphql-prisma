export function setPatternValues(
  pattern: string,
  values: Record<string, string>,
) {
  const vars = pattern.matchAll(/\^(.*?)\$/g);
  for (const [maskedVariable, variable] of vars) {
    pattern = pattern.replace(maskedVariable, values[variable]);
  }
  return pattern;
}
