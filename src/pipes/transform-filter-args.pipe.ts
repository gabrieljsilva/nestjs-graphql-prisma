import { Inject, PipeTransform } from '@nestjs/common';
import { GraphqlFilterService } from '@gabrieljsilva/nestjs-graphql-filter';

export class TransformFilterArgsPipe implements PipeTransform {
  constructor(
    @Inject(GraphqlFilterService)
    private readonly graphqlFilterService: GraphqlFilterService,
  ) {}

  transform(value: any) {
    return this.graphqlFilterService.getQuery(value);
  }
}
