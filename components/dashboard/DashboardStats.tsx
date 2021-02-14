import React from 'react';
import useSWR from 'swr';

import { API_ROUTES } from '@/lib/constants';
import { Stats } from '@/lib/types';

import { StatCard } from './StatCard';

interface DashboardStats {
  isLoading?: boolean;
}

export function DashboardStats({ isLoading: isLoading_ }: DashboardStats) {
  const { data: stats, error } = useSWR<Stats>(API_ROUTES.GetStats);

  const hasFailed = !stats || error;
  const isLoading = (!stats && !error) || isLoading_;

  if (hasFailed && !isLoading) {
    return <div>Error: {error?.message ?? 'Stats not found.'}</div>;
  }

  return (
    <div className={`${isLoading ? 'animate-pulse' : ''}`}>
      {isLoading ? (
        <div className="h-7 w-2/6 bg-gray-300 rounded-md" />
      ) : (
        <h1 className="text-3xl font-semibold">Welcome {stats?.name}!</h1>
      )}
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mt-6">
        <StatCard
          stat={stats?.followers}
          label="Followers"
          isLoading={isLoading}
        />
        <StatCard
          stat={stats?.following}
          label="Following"
          isLoading={isLoading}
        />
        <StatCard
          stat={stats?.publicGists}
          label="Public Gists"
          isLoading={isLoading}
        />
        <StatCard
          stat={stats?.publicRepos}
          label="Public Repos"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
