import { Mailer, SendEmailParams } from '../../types/interfaces/Mailer';
import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import { join } from 'path';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class SMTPMailerProvider extends Mailer {
  private readonly transporter: Transporter;
  private readonly from: string;

  constructor() {
    super();
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    this.from = process.env.APP_EMAIL;
  }

  async sendEmail(params: SendEmailParams) {
    const html = await SMTPMailerProvider.renderHTML(
      params.templateIdOrKey,
      params.variables,
    );

    await this.transporter.sendMail({
      html,
      subject: params.subject,
      from: this.from,
      to: params.targetsEmails,
      attachments: params.attachments,
    });
  }

  private static async renderHTML(
    template: string,
    data?: Record<string, string>,
  ) {
    const templatePath = join(__dirname, 'templates', template + '.ejs');
    const partialsPath = join(__dirname, 'partials');

    return renderFile(templatePath, data, {
      views: [partialsPath],
    });
  }
}
