export interface EmailAttachment {
  filename: string;
  cid: string;
  contentType: string;
  content: string | Buffer; //Base64 encoded or Buffer
}

export interface SendEmailParams {
  targetsEmails: string[];
  subject: string;
  templateIdOrKey?: string;
  attachments?: EmailAttachment[];
  variables?: Record<string, string>;
}

export abstract class Mailer {
  abstract sendEmail(params: SendEmailParams);
}
