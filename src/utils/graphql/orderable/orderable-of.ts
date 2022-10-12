import { Type } from '@nestjs/common';

export function OrderableOf(type: Type) {
  class Orderable {}

  return Orderable;
}
