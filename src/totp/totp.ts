import { authenticator } from 'otplib';

import Config from '../private/zerodha.json';
authenticator.options = { digits: 6 };

export const getToken = () => {
  const token = authenticator.generate(Config.TOTP_KEY);
  return token;
};
