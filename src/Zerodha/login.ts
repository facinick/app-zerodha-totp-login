import { Logger } from '../Logger/logger';
import {
  click_submitTOTP,
  click_submitUsernamePassword,
  gotoConnectionPage,
  input_password,
  input_TOTP,
  input_userid,
  wait_RedirectionToOTPPage,
  wait_RedirectToTTSuccessPage,
  wait_RedirectToZerodhaLoginPage,
  wait_ZerodhaLoginPageToFinishLoading,
} from '../selenium/functions';
import { getToken } from '../totp/totp';

export const connect = async (): Promise<void> => {
  try {
    Logger.info({
      message: `going to connect url`,
      className: 'connect',
    });
    await gotoConnectionPage();
    Logger.info({
      message: `waiting for redirection to zerodha login page`,
      className: 'connect',
    });
    await wait_RedirectToZerodhaLoginPage();
    Logger.info({
      message: `waiting for login page to finish loading`,
      className: 'connect',
    });
    await wait_ZerodhaLoginPageToFinishLoading();
    Logger.info({
      message: `about to fill in user id`,
      className: 'connect',
    });
    await input_userid();
    Logger.info({
      message: `about to fill in password`,
      className: 'connect',
    });
    await input_password();
    Logger.info({
      message: `clicking submit`,
      className: 'connect',
    });
    await click_submitUsernamePassword();
    Logger.info({
      message: `waiting for otp form to load`,
      className: 'connect',
    });
    await wait_RedirectionToOTPPage();
    Logger.info({
      message: `generating otp`,
      className: 'connect',
    });
    const otp = getToken();
    Logger.info({
      message: `generated otp is: ${otp}`,
      className: 'connect',
    });
    Logger.info({
      message: `filling in otp`,
      className: 'connect',
    });
    await input_TOTP(otp);
    Logger.info({
      message: `clicking continue`,
      className: 'connect',
    });
    await click_submitTOTP();
    Logger.info({
      message: `waiting to redirect to tt connect success page`,
      className: 'connect',
    });
    await wait_RedirectToTTSuccessPage();
    Logger.success({
      message: `done`,
      className: 'connect',
      notify: true,
    });
  } catch (error) {
    Logger.error({
      message: `some error occured`,
      className: 'connect',
      data: error,
      notify: true,
    });
  }
};
