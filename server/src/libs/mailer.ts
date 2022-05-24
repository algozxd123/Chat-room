import nodemailer from 'nodemailer';

const host = process.env.EMAIL_HOST ?? '';
const port = parseInt(process.env.EMAIL_PORT ?? '', 10);
const user = process.env.EMAIL_USER ?? '';
const pass = process.env.EMAIL_PASSWORD ?? '';

const transport = nodemailer.createTransport({
  host,
  port,
  secure: true,
  auth: {
    user,
    pass,
  },
});

export default transport;
