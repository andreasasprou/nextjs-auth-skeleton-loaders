import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { Layout } from '@/components/Layout';
import { ROUTES } from '@/lib/constants';
import { useUser } from '@/lib/hooks/useUser';
import { CustomPage } from '@/lib/types';

const githubUrl = (username: string) =>
  `https://api.github.com/users/${username}`;

const DashboardPage: CustomPage = () => {
  const { user } = useUser();

  return (
    <Layout>
      <h1>Your GitHub profile</h1>
      <h2>
        This page uses{' '}
        <a href="https://nextjs.org/docs/basic-features/pages#static-generation-recommended">
          Static Generation (SG)
        </a>{' '}
        and the <a href="/api/user">/api/user</a> route (using{' '}
        <a href="https://github.com/zeit/swr">SWR</a>)
      </h2>

      <p style={{ fontStyle: 'italic' }}>
        Public data, from{' '}
        <a href={githubUrl(user?.username)}>{githubUrl(user?.username)}</a>,
        reduced to `username` and `avatar_url`.
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
};

DashboardPage.skeletonLoader = <DashboardSkeleton />;
DashboardPage.redirectUnAuthenticatedTo = ROUTES.Login;

export default DashboardPage;
