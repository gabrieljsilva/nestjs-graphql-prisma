import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { EXCEPTION_CODES, RESOURCE } from '@enums';

export class AlreadyExistsException extends BaseException {
  constructor(resource: RESOURCE, keys: Record<string, string>) {
    super(
      {
        message: `${resource} already exists`,
        code: EXCEPTION_CODES.RESOURCE_ALREADY_EXISTS,
        keys,
      },
      HttpStatus.CONFLICT,
    );
  }
}
