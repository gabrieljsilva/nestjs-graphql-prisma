import { Type } from '@nestjs/common';

export function assertClassName(classOrFunction: Type, name: string) {
  const assertionRef = { [name]: class extends classOrFunction {} };
  return assertionRef[name];
}
