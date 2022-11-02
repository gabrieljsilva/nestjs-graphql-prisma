import { DynamicModule, Module, Type } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { Mailer } from './types/interfaces/Mailer';
import { SMTPMailerProvider } from './providers/SMTPMailer';

@Module({
  providers: [MailerService],
})
export class MailerModule {
  static forRoot(provider: Type<Mailer> = SMTPMailerProvider): DynamicModule {
    return {
      module: MailerModule,
      providers: [
        {
          provide: Mailer,
          useClass: provider,
        },
      ],
      exports: [MailerService],
    };
  }
}
