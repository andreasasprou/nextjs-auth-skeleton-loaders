import React, { useState } from 'react';

import { API_ROUTES } from '@/lib/constants';
import { fetchJson } from '@/lib/fetchJson';
import { useUser } from '@/lib/hooks/useUser';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { mutateUser } = useUser();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
    };

    try {
      await mutateUser(
        fetchJson(API_ROUTES.Login, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }),
      );

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErrorMessage(error.data.message);
    }
  };

  return (
    <form className="flex mx-auto max-w-sm space-x-3" onSubmit={handleSubmit}>
      <div className="w-full max-w-2xl px-5 py-6 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="mb-4 text-xl font-light text-center text-gray-800 dark:text-white font-medium">
          Enter your Github username to sign in
        </div>
        <input
          type="text"
          className="w-full rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Github Username"
          name="username"
          required
        />
        <div className="col-span-2 text-right mt-4">
          <button
            type="submit"
            className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Sign in
          </button>
        </div>
        {errorMessage && (
          <p className="font-medium text-red-600 mt-4">{errorMessage}</p>
        )}
      </div>
    </form>
  );
}
