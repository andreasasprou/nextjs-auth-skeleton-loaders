import { useRouter } from 'next/router';

import { LoginForm } from '@/components/LoginForm';
import { WebLayout } from '@/layouts/WebLayout';
import { ROUTES } from '@/lib/constants';
import { CustomPage, User } from '@/lib/types';

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
    <>
      <LoginForm onSuccess={handleSuccess} />
    </>
  );
};

LoginPage.getLayout = (page) => <WebLayout>{page}</WebLayout>;
LoginPage.authRedirect = {
  if: (user) => Boolean(user?.isLoggedIn),
  to: ROUTES.Dashboard,
};

export default LoginPage;
