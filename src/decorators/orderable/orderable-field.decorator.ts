export function OrderableField() {
  return (target: any, key: string) => {
    const fields = Reflect.getMetadata('orderableFields', target.constructor);
    fields
      ? fields.push(key)
      : Reflect.defineMetadata('orderableFields', [key], target.constructor);
  };
}
