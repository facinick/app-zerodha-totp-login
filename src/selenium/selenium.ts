import * as webdriver from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
console.log(chrome);
const driver = new webdriver.Builder().forBrowser('chrome').build();

export default driver;
export { webdriver as Driver };
