import nodemailer from "nodemailer";

type Email = {
  to: string;
  name?: string;
  subject: string;
  body: string;
};

const domain = process.env.NEXT_PUBLIC_APP_URL!;

export async function sendMail({ to, name, subject, body }: Email) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  //Setup Gateway Transport
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  //Verify the TestResult
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  //Send
  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendMail({
    to: email,
    subject: "2FA Code",
    body: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendMail({
    to: email,
    subject: "Reset your password",
    body: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendMail({
    to: email,
    subject: "Confirm your email",
    body: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
