import { authenticator, totp } from 'otplib';
authenticator.options = { digits: 6 };
totp.options = { digits: 6 };
