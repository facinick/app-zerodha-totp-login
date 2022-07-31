import { Logger } from './Logger/logger';
import { Kite } from './Zerodha/kite';
import { login } from './Zerodha/login';
import ZerodhaConfig from './private/zerodha.json';

const main = async (): Promise<void> => {
  Logger.info({
    message: `starting main app`,
    className: 'main',
    notify: true,
  });
  // create kite instance
  Kite.getInstance().init({ api_key: ZerodhaConfig.API_KEY });

  // login to kite connect api
  const logged_in = await login();

  if (!logged_in) {
    Logger.error({
      message: `something went wrong, couldn't log in. aborting!`,
      className: 'main',
    });
    process.exit();
  }

  Logger.success({
    message: `logged in!`,
    className: 'main',
  });
};

main();
