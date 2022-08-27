import nodemailer from 'nodemailer'

class MailService {
  transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.GENERATED_APP_PASSWORD,
      },
    })
  }

  async sendActivationMail(emailTo: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: emailTo,
      subject: `Account activation on ${process.env.CLIENT_URL} site`,
      text: '',
      html: `
        <div>
          <h1>Follow the link to activate your account</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    })
  }
}

export const mailService = new MailService()
