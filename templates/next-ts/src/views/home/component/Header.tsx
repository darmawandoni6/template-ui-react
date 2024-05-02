import Link from 'next/link';

const Header = () => {
  return (
    <>
      <h1>Welcome my template</h1>
      <ul>
        <li>
          <Link href="/">Post</Link>
        </li>
        <li>
          <Link href="/user">User</Link>
        </li>
      </ul>
    </>
  );
};

export default Header;
