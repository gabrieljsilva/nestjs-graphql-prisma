import { Permission } from './permission.model';
import { DefaultTestingValue } from '@decorators';
import { ROLES } from '@enums';

export class Role {
  @DefaultTestingValue('00000000-0000-4000-0000-000000000000')
  id: string;

  @DefaultTestingValue(ROLES.USER)
  name: string;

  @DefaultTestingValue(() => [Permission])
  permissions: Permission[];
}
