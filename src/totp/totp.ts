import { authenticator } from 'otplib';

authenticator.options = { digits: 6 };

export const getToken = () => {
  const token = authenticator.generate(process.env.TOTP_KEY);
  return token;
};
