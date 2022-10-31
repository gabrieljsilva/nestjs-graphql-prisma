import { Role } from './role.model';
import { PERMISSIONS } from '@enums';

export class Permission {
  id: string;
  name: PERMISSIONS;
  roles: Role[];
}
