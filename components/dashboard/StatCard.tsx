import React from 'react';

interface StatCardProps {
  stat?: number;
  label: string;
  isLoading?: boolean;
}

export function StatCard({ stat, label, isLoading }: StatCardProps) {
  return (
    <div
      className={`shadow-lg rounded-2xl w-36 p-4 bg-white dark:bg-gray-800 w-full ${
        isLoading ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-center">
        <p className="text-md text-gray-700 dark:text-gray-50">{label}</p>
      </div>
      <div className="flex flex-col justify-start mt-4">
        {isLoading ? (
          <div className="w-14 rounded-md h-10 bg-gray-300" />
        ) : (
          <p className="text-gray-800 text-4xl text-left dark:text-white font-bold">
            {stat}
          </p>
        )}
      </div>
    </div>
  );
}
