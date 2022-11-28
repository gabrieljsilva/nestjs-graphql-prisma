import { Role } from './role.model';
import { PERMISSIONS } from '@enums';
import { DefaultTestingValue } from '@decorators';

export class Permission {
  @DefaultTestingValue('00000000-0000-4000-0000-000000000000')
  id: string;

  @DefaultTestingValue(PERMISSIONS.CAN_GET_USER)
  name: PERMISSIONS;

  @DefaultTestingValue(() => Role)
  roles: Role[];
}
