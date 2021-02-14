import { withSession } from '@/lib/session';

const logout = withSession(async (req, res) => {
  req.session.destroy();
  res.json({ isLoggedIn: false });
});

export default logout;
