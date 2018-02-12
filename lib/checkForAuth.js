import cookies from 'next-cookies';
import decode from 'jsonwebtoken/decode';
import redirect from './redirect';

const checkForAuth = ctx => {
  const { res } = ctx;
  const { token } = cookies(ctx);
  try {
    if (token) {
      const user = decode(token);
      return { user };
    }
    // eslint-disable-next-line no-console
    console.log('Not Authorized, redirecting...');
    redirect({ res, url: '/login' });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Not Authorized, redirecting...', error);
    redirect({ res, url: '/login' });
  }
  return {};
};

export default checkForAuth;
