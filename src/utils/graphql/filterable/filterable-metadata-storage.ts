interface FilterableClassMetadata {
  fields?: Array<string>;
  typeName?: string;
}

class FilterableMetadataStorage {
  private metadata: Map<string, FilterableClassMetadata>;

  constructor() {
    this.metadata = new Map();
  }

  setMetadata(className: string, metadata: FilterableClassMetadata) {
    this.metadata.set(className, metadata);
  }

  getMetadata(className: string): Partial<FilterableClassMetadata> {
    return this.metadata.get(className) ?? {};
  }
}

export const filterableMetadataStorage = new FilterableMetadataStorage();
