import type { FC } from 'react';

import type { TFormInput } from './type';

const FormInput: FC<TFormInput> = (props) => {
  return (
    <div className="form-wrapper mb-4">
      <label className="mb-1">{props.label}</label>
      {props.children}
      <div className="invalid-feedback">{props.error}</div>
    </div>
  );
};

export default FormInput;
