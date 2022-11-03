import { applyDecorators, SetMetadata } from '@nestjs/common';
import { REQUIRED_PERMISSIONS_METADATA_KEY } from '@constants';
import { PERMISSIONS } from '@enums';

export function RequirePermissions(...permissions: PERMISSIONS[]) {
  return applyDecorators(
    SetMetadata(REQUIRED_PERMISSIONS_METADATA_KEY, permissions),
  );
}
