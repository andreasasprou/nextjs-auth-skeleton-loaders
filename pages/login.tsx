import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/LoginForm';
import { ROUTES } from '@/lib/constants';
import { useRedirectUser } from '@/lib/hooks/useRedirectUser';
import { CustomPage } from '@/lib/types';

function useRedirectToAfterLogin() {
  const { next } = useRouter().query;

  if (!next) {
    return undefined;
  }

  return decodeURIComponent(next as string);
}

const LoginPage: CustomPage = () => {
  useRedirectUser({
    redirectTo: ROUTES.Dashboard,
    redirectIf: (user) => Boolean(user.isLoggedIn),
  });

  const router = useRouter();
  const redirectTo = useRedirectToAfterLogin();

  const handleSuccess = () => {
    router.push(redirectTo ?? ROUTES.Dashboard);
  };

  return (
    <Layout>
      <div className="login">
        <LoginForm onSuccess={handleSuccess} />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </Layout>
  );
};

export default LoginPage;
