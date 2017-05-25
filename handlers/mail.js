const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  service: 'Postmark',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const devTransport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/email/new-order.pug`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: 'The Flour Boutique <noreply@theflourboutique.com>',
    to: 'theflourboutiquecookies@gmail.com',
    subject: options.subject,
    html,
    text
  };

  const sendDevMail = promisify(transport.sendDevMail, devTransport);
  const sendMail = promisify(transport.sendMail, transport);
  if (process.env.NODE_ENV === 'production') {
    return sendMail(mailOptions);
  } else {
    return sendDevMail(mailOptions);
  }
};
