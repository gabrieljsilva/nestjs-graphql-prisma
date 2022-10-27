import { Type } from '@nestjs/common';

export function unpackFieldTypeIfIsArray(
  explicitFieldTypeFN: () => Type | [Type],
) {
  if (!explicitFieldTypeFN) {
    return { fieldType: undefined, isArray: false };
  }

  const explicitFieldType = explicitFieldTypeFN();

  if (Array.isArray(explicitFieldType)) {
    const fieldType = explicitFieldType[0];
    return { fieldType, isArray: true };
  }

  return { fieldType: explicitFieldType, isArray: false };
}
