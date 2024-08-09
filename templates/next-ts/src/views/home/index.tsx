'use client';

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { jsonplaceholder } from '@src/api/jsonplaceholder';
import { useDispatch, useStateValue } from '@src/providers';

import List from './component/List';
import styles from './styles.module.scss';

const Home = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (params.id) {
      dispatch(jsonplaceholder.fetchDetail(params.id as string));
    } else {
      dispatch(jsonplaceholder.fetch());
    }
  }, [params]);

  const { list } = useStateValue();

  if (list.loading) {
    return (
      <main className={styles.main}>
        <h1> Loading</h1>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>Welcome my template</h1>
      {list.error && <h1>{list.error}</h1>}
      <div>
        <List />
      </div>
    </main>
  );
};

export default Home;
