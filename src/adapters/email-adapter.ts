import nodemailer from "nodemailer";

export const emailAdaptor = {
  async sendEmail(payload: any) {
    const transport = {
      service: "gmail",
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || "uykrop@gmail.com",
        pass: process.env.SMTP_PASSWORD || "ejre kuig ztlf vpcb",
      },
    };

    let transporter = nodemailer.createTransport(transport);

    transporter.sendMail({
      from: payload.email,
      to: payload.email,
      subject: payload.subject,
      text: payload.message,
    });
  },
};
