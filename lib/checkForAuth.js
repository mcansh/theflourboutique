import cookies from 'next-cookies';
import decode from 'jsonwebtoken/decode';
import redirect from './redirect';

const noAuth = ({ res, error }) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Not Authorized, redirecting...', error);
    redirect({ res, url: '/login', type: 401 });
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Not Authorized, redirecting...');
  redirect({ res, url: '/login', type: 401 });
};

const checkForAuth = ctx => {
  const { res } = ctx;
  const { token } = cookies(ctx);
  try {
    if (token) {
      const user = decode(token);
      return { user };
    }
    noAuth({ res });
  } catch (error) {
    noAuth({ res, error });
  }
  return {};
};

export default checkForAuth;
