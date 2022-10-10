import { BaseException } from './base.exception';
import { EXCEPTION_CODES, RESOURCE } from '@enums';
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends BaseException {
  constructor(resource: RESOURCE, keys: Record<string, string | number>) {
    super(
      {
        message: `${resource} NOT FOUND`,
        code: EXCEPTION_CODES.NOT_FOUND,
        keys: keys,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
