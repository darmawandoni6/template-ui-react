'use client';

import { type InputHTMLAttributes, forwardRef, useMemo, useState } from 'react';

import styles from './styles.module.scss';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { password?: boolean }>(
  ({ password = false, ...props }, ref) => {
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
        <input ref={ref} type={inputType} {...props} />
        {password && (
          <span className={styles.icon} role="button" onClick={() => setShow((prev) => !prev)}>
            <i className={`fa ${show ? 'fa-eye' : 'fa-eye-slash'}`}></i>
          </span>
        )}
      </>
    );
  },
);
Input.displayName = 'Input';

export default Input;
