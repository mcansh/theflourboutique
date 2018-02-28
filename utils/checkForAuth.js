import cookies from 'next-cookies';
import decode from 'jwt-decode';
import redirect from './redirect';

const noAuth = ({ ctx }) => redirect({ ctx, url: '/login' });

const checkForAuth = ctx => {
  const { token } = cookies(ctx);
  if (!token) noAuth({ ctx });
  const user = decode(token);
  return { user };
};

export default checkForAuth;
