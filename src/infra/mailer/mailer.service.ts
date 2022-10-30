import { Injectable } from '@nestjs/common';
import { Mailer, SendEmailParams } from './types/interfaces/Mailer';

@Injectable()
export class MailerService {
  constructor(private readonly mailer: Mailer) {}

  sendEmail(params: SendEmailParams) {
    return this.mailer.sendEmail(params);
  }
}
