export function createClassRef(name: string) {
  const assertionRef = { [name]: class {} };
  return assertionRef[name];
}
