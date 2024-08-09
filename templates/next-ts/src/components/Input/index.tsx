import type { FC, InputHTMLAttributes } from 'react';
import { useMemo, useState } from 'react';

import styles from './styles.module.scss';

const Input: FC<InputHTMLAttributes<HTMLInputElement> & { password?: boolean }> = ({ password, ...props }) => {
  const [show, setShow] = useState<boolean>(false);

  const inputType = useMemo(() => {
    if (password) {
      if (show) return 'text';
      return 'password';
    }
    return props.type;
  }, [show]);

  return (
    <>
      <input type={inputType} {...props} autoComplete="new-password" />
      {password && (
        <span className={styles.icon} role="button" onClick={() => setShow((prev) => !prev)}>
          <i className={`fa ${show ? 'fa-eye' : 'fa-eye-slash'}`}></i>
        </span>
      )}
    </>
  );
};

export default Input;
