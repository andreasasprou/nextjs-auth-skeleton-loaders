import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';
import { LoginForm } from '@/components/LoginForm';
import { ROUTES } from '@/lib/constants';
import { CustomPage } from '@/lib/types';

function useRedirectToAfterLogin() {
  const { next } = useRouter().query;

  if (!next) {
    return undefined;
  }

  return decodeURIComponent(next as string);
}

const LoginPage: CustomPage = () => {
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

LoginPage.redirectAuthenticatedTo = ROUTES.Dashboard;

export default LoginPage;
