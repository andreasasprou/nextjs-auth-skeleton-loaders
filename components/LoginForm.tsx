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
    <form onSubmit={handleSubmit}>
      <label>
        <span>Type your GitHub username</span>
        <input type="text" name="username" required />
      </label>

      <button type="submit">Login</button>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  );
}
