import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import Button from '@src/components/Button';
import { useStateValue } from '@src/providers';

const List = () => {
  const params = useParams();
  const router = useRouter();
  const { list } = useStateValue();

  if (params.id && list.detail) {
    const { detail } = list;
    return (
      <>
        <h2>{detail.title} </h2>
        <p>{detail.body}</p>
        <Button className="btn-primary mt-2" style={{ width: 'auto' }} onClick={() => router.back()}>
          <i className="fa-solid fa-arrow-left me-2"></i> Back
        </Button>
      </>
    );
  }

  return (
    <ul>
      {list.data!.map((item) => (
        <li key={item.id}>
          <Link href={`/posts/${item.id}`}>
            <h2>{item.title}</h2>
          </Link>
          <p>{item.body}</p>
        </li>
      ))}
    </ul>
  );
};

export default List;
