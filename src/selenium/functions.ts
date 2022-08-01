import { By } from 'selenium-webdriver';

import {
  APP_SUCCESS_PAGE_CONTAINS,
  PasswordInputId,
  TOTPInputId,
  UsernameInputId,
  ZERODHA_KITE_LOGIN_URL,
} from '../utils/constants';
import {
  getAppZerodhaConnectUrl,
  getPassword,
  getUserId,
  wait,
} from '../utils/helper';

import driver, { Driver } from './selenium';

const WAIT_FOR_MS = 10000;

// connect url[1] will redirect to kite login page[2]
export const gotoConnectionPage = async (url?: string): Promise<void> => {
  await driver.get(url ? url : getAppZerodhaConnectUrl(process.env.API_KEY));
};

// kite login page [2] will authneitcate user and finally redirect to zerodha's success url[3]
export const wait_RedirectToZerodhaLoginPage = async (): Promise<void> => {
  await driver.wait(
    Driver.until.urlContains(ZERODHA_KITE_LOGIN_URL),
    WAIT_FOR_MS
  );
};

// tt success page[3] is here
export const wait_RedirectToTTSuccessPage = async (): Promise<void> => {
  await driver.wait(
    Driver.until.urlContains(`${APP_SUCCESS_PAGE_CONTAINS}`),
    WAIT_FOR_MS
  );
};

export const wait_ZerodhaLoginPageToFinishLoading = async (): Promise<void> => {
  // just waiting for the userid input field to load
  await driver.wait(
    Driver.until.elementLocated(By.id(UsernameInputId)),
    WAIT_FOR_MS
  );
};

export const input_userid = async (): Promise<void> => {
  const useridInputField = await driver.findElement(By.id(UsernameInputId));
  await useridInputField.sendKeys(getUserId());
  while ((await useridInputField.getAttribute('value')) !== getUserId())
    wait(1);
};

export const input_password = async (): Promise<void> => {
  const passwordInputField = await driver.findElement(By.id(PasswordInputId));
  await passwordInputField.sendKeys(getPassword());
  while ((await passwordInputField.getAttribute('value')) !== getPassword())
    wait(1);
};

export const click_submitUsernamePassword = async (): Promise<void> => {
  const submitButton = await driver.findElement(By.css('button'));
  await submitButton.click();
};

export const wait_RedirectionToOTPPage = async (): Promise<void> => {
  // just waiting for the otp input field to load
  await driver.wait(
    Driver.until.elementLocated(By.id(TOTPInputId)),
    WAIT_FOR_MS
  );
};

export const input_TOTP = async (otp: string): Promise<void> => {
  const otpInputField = await driver.findElement(By.id(TOTPInputId));
  await otpInputField.sendKeys(otp);
  while ((await otpInputField.getAttribute('value')) !== otp) wait(1);
};

export const click_submitTOTP = async (): Promise<void> => {
  const continueButton = await driver.findElement(By.css('button'));
  await continueButton.click();
};
