import { fetchJson } from '@/lib/fetchJson';
import { withSession } from '@/lib/session';
import { User } from '@/lib/types';

const stats = withSession(async (req, res) => {
  const user = req.session.get('user') as User | undefined;

  if (!user?.isLoggedIn) {
    res.status(401).json({
      status: 401,
      message: 'Not Authenticated',
    });
    return;
  }

  const userData = await fetchJson(
    `https://api.github.com/users/${user.username}`,
  );

  res.json({
    publicRepos: userData.public_repos,
    publicGists: userData.public_gists,
    following: userData.following,
    followers: userData.followers,
    name: userData.name,
  });
});

export default stats;
