import { fetchJson } from '@/lib/fetchJson';
import { withSession } from '@/lib/session';
import { User } from '@/lib/types';

const login = withSession(async (req, res) => {
  const { username } = await req.body;
  const url = `https://api.github.com/users/${username}`;

  try {
    // we check that the user exists on GitHub and store some data in session
    const { login, avatar_url: avatarUrl } = await fetchJson(url);
    const user: User = { isLoggedIn: true, username: login, avatarUrl };

    req.session.set('user', user);

    await req.session.save();
    res.json(user);
  } catch (error) {
    const { response: fetchResponse } = error;
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default login;
