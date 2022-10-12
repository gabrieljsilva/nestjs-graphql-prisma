import { Type } from '@nestjs/common';

const classFieldsMap = {};

export function OrderableEntity() {
  return (constructor: Type) => {
    classFieldsMap[constructor.name] = Reflect.getMetadata(
      'orderableFields',
      constructor,
    );
  };
}
