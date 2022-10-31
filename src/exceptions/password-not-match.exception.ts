import { HttpStatus } from '@nestjs/common';
import { EXCEPTION_CODES } from '@enums';
import { BaseException } from './base.exception';

export class PasswordNotMatchException extends BaseException {
  constructor() {
    super(
      {
        message: `password not match`,
        code: EXCEPTION_CODES.PASSWORD_NOT_MATCH,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
