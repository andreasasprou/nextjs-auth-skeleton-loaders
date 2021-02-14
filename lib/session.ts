// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSession } from 'next-iron-session';

import { ClientConstants } from '@/lib/constants';

export function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: ClientConstants.AuthCookieName,
    cookieOptions: {
      // Allows us to read the cookie on non-https environments like localhost
      httpOnly: process.env.NODE_ENV === 'production',
      // Allows to use the session in non-https environments like localhost
      secure: process.env.NODE_ENV === 'production',
    },
  });
}
