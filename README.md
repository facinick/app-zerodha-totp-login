# Tradetron-zerodha-totp-login

Automate TOTP login for a Zerodha Connect App.

---
## Preparation I:

1. Download selenium webdriver from the following location:

Selenium webdriver (https://chromedriver.chromium.org/downloads)

2. Read the following article to add it to your path in your OS.

How to add webdriver to PATH (https://www.browserstack.com/guide/run-selenium-tests-using-selenium-chromedriver#:~:text=Go%20to%20the%20terminal%20and,Type%20Y%20to%20save)

## Preparation II
1. Rename file `.env.example` to `.env`
2. Fill in all the four values: (`API_KEY`, `USERID`, `PASSWORD`, `TOTP_KEY`)

`API_KEY`: Zerodha app's api key. Get it from the app you have created in zerodha connect api website.

`USERID`: Kite zerodha userid. You use it to log into kite website.

`PASSWORD`: Kite zerodha password. You use it to log into kite website.

`TOTP_KEY`: Zerodha app's TOTP secret. When you enable TOTP, in kite website's settings.. it shows you a QR code that you scan with your authenticator app like google authenticator. below that qr code there is a link where if you click it'll give you a key that might look like ***MSMMH3G44BS42MI34WOKHVDBLRRXULDW***.
This is your TOTP_KEY.

final `.env` file content should look similar to this:

```
API_KEY="2jjerkdihur6m3j4"
USERID="WY3242"
PASSWORD="hellokitty123"
TOTP_KEY="MSMMH3G44BS42MI34WOKHVDBLRRXULDW"
```

---
## Run

After you are done filling in the values in .env file, run the following commands in order:

1. to install dependencies

`yarn`

2. to build app

`yarn build`

3. to start (change `[PATH_TO_PROJECT_FOLDER]` to the folder's absolute address in your system)

`node [PATH_TO_PROJECT_FOLDER]/build/main/index.js`

---
## Steps (what's happening):

1. go to zerodha app connect login page
2. wait for it to redirect to kite login page
3. fill in username and password and submit
4. wait for it to show totp input
5. genertate totp using users zerodha totp secret key
6. fill in totp and submit
7. wait for zerodha to redirect to the apps redirect url
8. done