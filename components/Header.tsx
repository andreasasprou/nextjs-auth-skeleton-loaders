import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { API_ROUTES, ROUTES } from '@/lib/constants';
import { fetchJson } from '@/lib/fetchJson';
import { useUser } from '@/lib/hooks/useUser';

export function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href={ROUTES.Home}>
              <a>Home</a>
            </Link>
          </li>
          {!user?.isLoggedIn && (
            <li>
              <Link href={ROUTES.Login}>
                <a>Login</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn && (
            <>
              <li>
                <Link href={ROUTES.Dashboard}>
                  <a>
                    <img
                      alt={user}
                      src={user.avatarUrl}
                      width={20}
                      height={20}
                    />{' '}
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <a
                  onClick={async (e) => {
                    e.preventDefault();
                    await mutateUser(fetchJson(API_ROUTES.Logout));
                    router.push(ROUTES.Home);
                  }}
                >
                  Logout
                </a>
              </li>
            </>
          )}
          <li>
            <a href="https://github.com/vvo/next-iron-session">
              <img
                alt="Git Repo"
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
              />
            </a>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:first-child {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
}
