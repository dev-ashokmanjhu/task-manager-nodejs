const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4c292a75281ab2",
      pass: "db52a1c51a205d",
    },
  });

  const emailOptions = {
    from: "Ashok Manjhu <dev.ashokmanjhu@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(emailOptions);
};

module.exports = sendMail;
