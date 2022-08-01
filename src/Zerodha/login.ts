import { By } from 'selenium-webdriver';

import ZerodhaConfig from '../private/zerodha.json';
import driver, { Driver } from '../selenium/selenium';
import {
  getPassword,
  getTradetronZerodhaZonnectUrl,
  getUserId,
  saveZerodhaConfigLocal,
  wait,
} from '../utils/helper';
import { questionAsync } from '../utils/user_input';

const WAIT_FOR_MS = 10000;

import { Kite } from './kite';

export const login = async (): Promise<boolean> => {
  console.log(`log: [auth] attempting to log in...`);

  if (ZerodhaConfig.ACCESS_TOKEN) {
    console.log(`log: [auth] local access_token found, validating...`);

    const is_valid = await is_access_token_valid({
      access_token: ZerodhaConfig.ACCESS_TOKEN,
    });

    if (is_valid) {
      console.log(
        `log: [auth] local access token '${ZerodhaConfig.ACCESS_TOKEN}' is valid!`
      );
      return true;
    } else {
      console.log(
        `log: [auth] local access token '${ZerodhaConfig.ACCESS_TOKEN}' is invalid! clearing it`
      );
      ZerodhaConfig.ACCESS_TOKEN = '';
      saveZerodhaConfigLocal(ZerodhaConfig);
    }
  }

  console.log(`log: [auth] local access_token not found or is invalid`);

  let is_valid = false;
  let access_token = '';
  let attempts = 0;

  while (!is_valid) {
    attempts = attempts + 1;
    console.log(`log: [auth] login attempt #${attempts}`);

    [is_valid, access_token] = await manual_enter_token();
    if (is_valid) {
      console.log(
        `log: [auth] entered access token '${access_token}' is valid, saving it`
      );
      ZerodhaConfig.ACCESS_TOKEN = access_token;
      saveZerodhaConfigLocal(ZerodhaConfig);
      return true;
    } else {
      if (attempts === 3) {
        console.log(`log: [auth] failed #${attempts} attempts!`);
        return false;
      }
      console.log(
        `log: [auth] entered access token '${access_token}' is invalid! asking again...`
      );
    }
  }

  return false;
};

export const manual_enter_token = async (): Promise<[boolean, string]> => {
  const ACCESS_TOKEN = await questionAsync({
    question: 'Enter Zerodha App Access Token',
  });
  const is_valid = await is_access_token_valid({ access_token: ACCESS_TOKEN });
  return [is_valid, ACCESS_TOKEN];
};

export const is_access_token_valid = async ({
  access_token,
}: {
  access_token: string;
}): Promise<boolean> => {
  await Kite.getInstance().useAccessToken({
    access_token: access_token,
  });

  const [, get_position_error] = await Kite.getInstance().getPositions();
  if (get_position_error) {
    console.log(`log: [login] [error] get positions failed`);
    return false;
  }

  return true;
};

export const connect = async (): Promise<void> => {
  // [goto] connect url
  await gotoConnectionPage();
  // [wait] for redirection to zerodha login page
  await waitForRedirectToZerodhaLoginPage();
  // [wait] for zerodha login page to finish loading
  await waitForZerodhaLoginPageToFinishLoading();
  // [fill] in userID
  await fillUserId();
  // [fill] in password
  await fillPassword();
  // [submit]
  await clickSubmit();
  // [wait] from redirection to otp input page
  await waitForRedirectionToOTPPage();
  // generate OTP using totp library
  const otp = '';
  // [fill] in OTP
  await fillOTP(otp);
  // [submit]
  await clickContinue();
  // [wait] for redirection to trdetron page
  await waitForRedirectToTTPage();
};

export const gotoConnectionPage = async (): Promise<void> => {
  await driver.get(getTradetronZerodhaZonnectUrl(`6jvertdihur4m3j0`));
};

const waitForRedirectToZerodhaLoginPage = async (): Promise<void> => {
  await driver.wait(
    Driver.until.urlContains(`kite.zerodha.com/connect/login?api`),
    WAIT_FOR_MS
  );
};

const waitForRedirectToTTPage = async (): Promise<void> => {
  await driver.wait(
    Driver.until.urlContains(`zerodha.tradetron.tech/login.php`),
    WAIT_FOR_MS
  );
};

const waitForZerodhaLoginPageToFinishLoading = async (): Promise<void> => {
  // just waiting for the userid input field to load
  await driver.wait(Driver.until.elementLocated(By.id(`userid`)), WAIT_FOR_MS);
};

const fillUserId = async (): Promise<void> => {
  const useridInputField = await driver.findElement(By.id('userid'));
  await useridInputField.sendKeys(getUserId());
  await driver.wait(
    Driver.until.elementTextIs(useridInputField, getUserId()),
    WAIT_FOR_MS
  );
};

const fillPassword = async (): Promise<void> => {
  const passwordInputField = await driver.findElement(By.id('userid'));
  await passwordInputField.sendKeys(getPassword());
  passwordInputField.getAttribute('value');
  while ((await passwordInputField.getAttribute('value')) !== getPassword())
    wait(2);
};

const clickSubmit = async (): Promise<void> => {
  const submitButton = await driver.findElement(By.css('button'));
  await submitButton.click();
};

const waitForRedirectionToOTPPage = async (): Promise<void> => {
  // just waiting for the otp input field to load
  await driver.wait(Driver.until.elementLocated(By.id(`totp`)), WAIT_FOR_MS);
};

const fillOTP = async (otp: string): Promise<void> => {
  const otpInputField = await driver.findElement(By.id('totp'));
  await otpInputField.sendKeys(otp);
  await driver.wait(
    Driver.until.elementTextIs(otpInputField, otp),
    WAIT_FOR_MS
  );
};

const clickContinue = async (): Promise<void> => {
  const continueButton = await driver.findElement(By.css('button'));
  await continueButton.click();
};
