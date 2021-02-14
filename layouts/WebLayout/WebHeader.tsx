import { useRouter } from 'next/router';
import React from 'react';

import { ROUTES } from '@/lib/constants';
import { useUser } from '@/lib/hooks/useUser';

export function WebHeader() {
  const { user } = useUser();
  const isLoggedIn = user?.isLoggedIn;
  const router = useRouter();
  const isLoginPage = router.pathname === ROUTES.Login;

  const handleMainCtaClick = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      router.push(ROUTES.Dashboard);
    } else {
      router.push(ROUTES.Login);
    }
  };

  return (
    <nav className="bg-gray-800 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="https://github.com/andreasasprou/nextjs-auth-skeleton-loaders"
            className="flex items-center text-white text-sm font-medium"
          >
            <img
              className="h-8 w-8 mr-3"
              src="/GitHub-Mark-Light-64px.png"
              alt="Github"
            />
            Git Repo
          </a>
          {!isLoginPage && (
            <div className="flex items-center">
              <a
                href="#"
                className={`bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium`}
                onClick={handleMainCtaClick}
              >
                {isLoggedIn ? 'Dashboard' : 'Sign in'}
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
