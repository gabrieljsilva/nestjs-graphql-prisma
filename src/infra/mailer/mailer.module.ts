import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Mailer } from './types/interfaces/Mailer';
import { SMTPMailerProvider } from './providers/SMTPMailer';

@Module({
  imports: [],
  providers: [
    MailerService,
    {
      provide: Mailer,
      useClass: SMTPMailerProvider,
    },
  ],
  exports: [MailerService],
})
export class MailerModule {}
