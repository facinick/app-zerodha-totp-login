import { Logger } from './Logger/logger';
import { connect } from './Zerodha/login';

const main = async (): Promise<void> => {
  Logger.info({
    message: `beginning to connect tt to zerodha`,
    className: 'main',
    notify: true,
  });

  await connect();
  process.exit();
};

main();
