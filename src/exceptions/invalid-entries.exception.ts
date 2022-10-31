import { BaseException } from './base.exception';
import { EXCEPTION_CODES } from '@enums';
import { HttpStatus, ValidationError } from '@nestjs/common';

export class InvalidEntriesException extends BaseException {
  constructor(errors: ValidationError[]) {
    const keys = {};

    for (const error of errors) {
      const [firstConstraintError] = Object.values(error.constraints);
      keys[error.property] = firstConstraintError;
    }

    super(
      {
        message: `invalid entries`,
        code: EXCEPTION_CODES.INVALID_ENTRIES,
        keys,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
