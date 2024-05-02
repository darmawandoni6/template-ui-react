'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import Header from './component/Header';
import List from './component/List';
import useApi from './hooks/useApi';
import styles from './styles.module.scss';

const Home = () => {
  const { fetch, fetchID } = useApi();

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      fetchID(params.id as string);
    } else {
      fetch();
    }
  }, [params]);

  return (
    <main className={styles.main}>
      <Header />
      <div>
        <List />
      </div>
    </main>
  );
};

export default Home;
