import { config } from './../config';
import nodemailer from 'nodemailer';
import { RouterEnum } from '../shared/enums/RouterEnum';

class MailService {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(emailTo: string, link: string) {
    await this.transporter.sendMail({
      from: config.SMTP_USER,
      to: emailTo,
      subject: `Account activation on ${RouterEnum.ApiUrl} site`,
      text: '',
      html: `
      <div>
        <h1>Follow the link to activate your account</h1>
        <a href="${link}">${link}</a>
      </div>
      `,
    });
  }
}

export const mailService = new MailService();
