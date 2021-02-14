import { withSession } from '@/lib/session';
import { User } from '@/lib/types';

const user = withSession(async (req, res) => {
  const user = req.session.get('user') as User | undefined;

  if (user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});

export default user;
