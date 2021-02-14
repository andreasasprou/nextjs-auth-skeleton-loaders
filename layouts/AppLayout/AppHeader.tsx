import { useRouter } from 'next/router';
import React from 'react';

import { API_ROUTES, ROUTES } from '@/lib/constants';
import { fetchJson } from '@/lib/fetchJson';
import { useUser } from '@/lib/hooks/useUser';

const githubUrl = (username: string) => `https://github.com/${username}`;

interface AppHeaderProps {
  isLoading?: boolean;
}

export function AppHeader({ isLoading }: AppHeaderProps) {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  const handleLogout = async (e) => {
    if (isLoading) {
      return;
    }

    e.preventDefault();
    await mutateUser(fetchJson(API_ROUTES.Logout));
    router.push(ROUTES.Home);
  };

  return (
    <nav
      className={`bg-gray-800 sticky top-0 z-10 ${
        isLoading ? 'animate-pulse' : ''
      }`}
    >
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
          <div className="flex items-center">
            <a
              onClick={handleLogout}
              href="#"
              className="text-white px-3 py-2 rounded-md text-sm font-medium mr-4"
            >
              Logout
            </a>
            <a href={githubUrl(user?.username)} target="_blank">
              {isLoading ? (
                <div className="h-8 w-8 rounded-full bg-gray-400" />
              ) : (
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatarUrl}
                  alt=""
                />
              )}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
