import { KiteConnect } from 'kiteconnect';

import { success } from '../utils/helper';

class Kite {
  private static instance: Kite;
  private _kc: KiteConnect;
  private _loginUrl: string;

  public init = ({ api_key }: { api_key: string }): void => {
    this._kc = new KiteConnect({
      api_key: api_key,
    });

    this._loginUrl = this._kc.getLoginURL();
    console.log(
      `log: [kite] kite connect initialized! login url: ${this._loginUrl}`
    );
  };

  public get loginUrl(): string {
    return this._loginUrl;
  }

  public static getInstance = (): Kite => {
    if (!Kite.instance) {
      Kite.instance = new Kite();
    }

    return Kite.instance;
  };

  public useAccessToken = async ({
    access_token,
  }: {
    access_token: string;
  }): Promise<[ReturnType<typeof success>, any]> => {
    try {
      await this._kc.setAccessToken(access_token);
      console.log(`log: [kite] using access token: ${access_token}`);
      return [success({ message: 'set access token sucessfullt' }), null];
    } catch (error) {
      return [null, error];
    }
  };

  public generateSession = async ({
    request_token,
    api_secret,
  }: {
    request_token: string;
    api_secret: string;
  }): Promise<[{ access_token: string }, any]> => {
    try {
      const session: { access_token: string } = await this._kc.generateSession(
        request_token,
        api_secret
      );
      return [session, null];
    } catch (error) {
      return [null, error];
    }
  };
}

export { Kite };
