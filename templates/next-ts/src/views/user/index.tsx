'use client';

import { useEffect } from 'react';

import useProviders from '@src/providers/useProviders';

import useApi from './hooks/useApi';

const User = () => {
  const { fetch } = useApi();
  const { user } = useProviders().state;

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <h1>INI USER</h1>
      <ul>
        {user.data.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>{JSON.stringify(item.address)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
