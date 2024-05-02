import type { ButtonHTMLAttributes, FC } from 'react';

import cx from 'classnames';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button {...props} className={cx('btn', props.className)}>
      {props.children}
    </button>
  );
};

export default Button;
