export const success = ({
  message,
}: {
  message: string;
}): { message: string } => {
  return { message };
};

export const wait = (seconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });

export function comparer<Type>(
  otherArray: Array<Type>
): (current: Type & { instrument_token: number }) => boolean {
  return function (current) {
    return (
      otherArray.filter(function (other: Type & { instrument_token: number }) {
        return other.instrument_token == current.instrument_token;
      }).length == 0
    );
  };
}

export const getUserId = () => process.env.USERNAME;

export const getPassword = () => process.env.PASSWORD;

export const getTradetronZerodhaConnectUrl = (zerodhaApiKey: string) => {
  return `${process.env.ZERODHA_APP_CONNECT_URL}${zerodhaApiKey}`;
};

export const isAWithinRangeOfB = ({
  a,
  b,
  inclusive = true,
  radius,
}: {
  a: number;
  b: number;
  inclusive: boolean;
  radius: number;
}): boolean => {
  const leftLimit = b - radius;
  const rightLimit = b + radius;

  if (a >= leftLimit && a <= rightLimit && inclusive) {
    return true;
  }

  if (a > leftLimit && a < rightLimit && !inclusive) {
    return true;
  }

  return false;
};

export function arrayUnique<Type>(array: Array<Type>): Array<Type> {
  const a = array.concat();

  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

export function mergeArraysUnique<Type>({
  array1,
  array2,
}: {
  array1: Array<Type>;
  array2: Array<Type>;
}): Array<Type> {
  const a = array1.concat();

  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  const b = array2.concat();

  for (let i = 0; i < b.length; ++i) {
    for (let j = i + 1; j < b.length; ++j) {
      if (b[i] === b[j]) b.splice(j--, 1);
    }
  }

  return a.concat(b);
}
